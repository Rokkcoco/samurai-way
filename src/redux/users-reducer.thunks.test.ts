import {actions, follow, unfollow} from "./users-reducer";
import {usersAPI} from "../api/users-api";
import {BaseResponseType, ResultCodes} from "../api/api";

jest.mock("../api/users-api")

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

const result: BaseResponseType = {
    resultCode: ResultCodes.Success,
    data: {},
    messages: []
}

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.follow.mockClear()
    usersAPIMock.unfollow.mockClear()
})
test("success follow thunk", async () => {
    const thunk = follow(1)
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress(false, 1))
})
test("success unfollow thunk", async () => {
    const thunk = unfollow(1)
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
    await thunk(dispatchMock, getStateMock, {})
    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowingProgress(false, 1))
})