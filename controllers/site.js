module.exports = {
  fetchItems: function(id, cb) {
    db.findAll().success(function(data){
      cb(data);
    });
  }
};
