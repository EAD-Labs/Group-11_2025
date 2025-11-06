const wrapasync = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
  };
  
  export default wrapasync;