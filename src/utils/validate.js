export default function (ref) {
  return new Promise(resolve => {
    ref.validate(valid => valid ? resolve(true) : resolve(false))
  })
}
