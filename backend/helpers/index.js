exports.uploadFile = async function (file, path) {
  return await new Promise((res, rej) => {
    file.mv(path, function (err) {
      if (err) {
        console.log(err);
        res(false);
      }
      res(true);
    });
  })
}