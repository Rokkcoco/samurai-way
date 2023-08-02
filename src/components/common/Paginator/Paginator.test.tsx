import {create} from "react-test-renderer";
import Paginator from "./Paginator";


describe("Paginator component tests", () => {
    test("pages count is 11 should be showed only 10", async() => {
        const component = create(<Paginator totalUsersCount={11} pageSize={1} currentPage={1} onPageChanged={()=>{}} portionSize={10}/>)
        const root = component.root
        const spans = await root.findAllByType("span")
        expect(spans.length).toBe(10)
    })

    test("if pages count is more then 10 button NEXT should be present", async() => {
        const component = create(<Paginator totalUsersCount={11} pageSize={1} currentPage={1} onPageChanged={()=>{}} portionSize={10}/>)
        const root = component.root
        const buttons = await root.findAllByType("button")
        expect(buttons.length).toBe(1)
    })
} )