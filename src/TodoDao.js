var TodoDao = function(){
  var name = 'localdb'
  var version = '1.0'
  var description = 'Web SQL Database'
  var size = 2 * 1024 * 1024
  var callback = console.log('Opened Database')
  var db = openDatabase(name, version, description, size, callback)

  // テーブル作成
  db.transaction(function(tx){
    tx.executeSql(`
      create table if not exists todo (
        id integer primary key autoincrement,
        todo varchar
      )
    `)
  })

  // 全件検索
  this.findAll = function(success){
    db.transaction(function (tx) {
      tx.executeSql('select * from todo', [],
        function (tx, results) {
          var list = []
          for (i = 0; i < results.rows.length; i++){
            list.push({
              id: results.rows.item(i).id,
              todo: results.rows.item(i).todo
            })
          }
          success(list)
        })
    })
  }

  // 登録
  this.insert = function(todo, callback){
    db.transaction(function (tx) {
      tx.executeSql('insert into todo (todo) values (?)', [todo], callback)
    })
  }

  // 更新
  this.update = function(id, todo, callback){
    db.transaction(function (tx) {
      tx.executeSql('update todo set todo = ? where id = ?', [todo, id], callback)
    })
  }

  // 削除
  this.remove = function(id, callback){
    db.transaction(function (tx) {
      tx.executeSql('delete from todo where id = ?', [id], callback)
    })
  }

}

module.exports = TodoDao