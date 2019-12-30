export default collection => {
  return async () => collection.find().toArray()
}
