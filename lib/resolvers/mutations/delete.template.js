import { ObjectId } from 'mongodb'

export default collection => {
  return async (_, { id }) => {
    const { value } = await collection.findOneAndDelete(
      { _id: ObjectId(id) }
    )
    return value
  }
}
