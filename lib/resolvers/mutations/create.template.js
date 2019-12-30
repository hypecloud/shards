import dayjs from 'dayjs'

export default collection => {
  return async (_, args) => {
    args.updatedAt = dayjs().toISOString()
    const { ops: [first] } = await collection.insertOne(args)
    return first
  }
}
