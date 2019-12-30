import dayjs from 'dayjs'
import { ObjectId } from 'mongodb'

export default collection => {
  return async (_, { id, ...updateParams }) => {
    updateParams.updatedAt = dayjs().toISOString()
    const { value } = await collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updateParams },
      { returnOriginal: false }
    )
    return value
  }
}
