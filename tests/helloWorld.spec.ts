import { filterEven } from '../src/helloWorld'

// import { mocked } from 'ts-jest/utils'
// // usage: mockerFunction = mocked(mockerdFunction) -- adds jest interface to type of function return

test('given [1,2,3,4,5,6] returns [2,4,6]', () => {
  expect(filterEven([1, 2, 3, 4, 5, 6])).toMatchObject([2, 4, 6])
})

test('given [3,3,3] returns []', () => {
  expect(filterEven([3, 3, 3])).toMatchObject([])
})
