import {create, ReactTestInstance} from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";


describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = create(<ProfileStatus status="hello" updateStatus={()=>{}}/>)
        const instance = component.getInstance() as ProfileStatus&ReactTestInstance
       expect(instance.state.status).toBe("hello")
    })

    test("after creation <span> should be displayed", async() => {
        const component = create(<ProfileStatus status="hello" updateStatus={()=>{}}/>)
        const root = component.root
        const span =  await root.findByType("span")
       expect(span).not.toBeNull()
    })

    test("after creation <input> shouldn't be displayed",  async() => {
        const component = create(<ProfileStatus status="hello" updateStatus={()=>{}}/>)
        const root = component.root
        let input
        let errorTest
        try {
            input =  await root.findByType("input")
        } catch(error:any) {
            errorTest = error
        }

        expect(errorTest.message).toBe('No instances found with node type: "input"')
    })

    test("after creation <span> should contains correct status", async() => {
        const component = create(<ProfileStatus status="hello" updateStatus={()=>{}}/>)
        const root = component.root
        const span =  await root.findByType("span")
       expect(span.children[0]).toBe("hello")
    })

    test("<input> should be displayed in editMode instead of <span>", async() => {
        const component = create(<ProfileStatus status="hello" updateStatus={()=>{}}/>)
        const root = component.root
        const span =  await root.findByType("span")
        span.props.onDoubleClick()
        const input =  await root.findByType("input")
       expect(input.props.value).toBe("hello")
    })

    test("callback should be called", async() => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status="hello" updateStatus={mockCallback}/>)
        const instance = component.getInstance() as ProfileStatus&ReactTestInstance
        instance.deactivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})