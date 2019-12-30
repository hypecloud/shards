import { ObjectId } from 'mongodb'

export default collection => {
  return async (_, { id }) => {
    const record = await collection.findOne(ObjectId(id))
    const createdAt = ObjectId(record._id).getTimestamp()
    return {
      ...record,
      createdAt
    }
  }
}
