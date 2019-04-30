const express = require('express');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const Multer = require('multer');

// 采用express
const server = express();

const loginRouter = express.Router();
const showRouter = express.Router();

server.listen(9111);
server.use(Multer({
	dest: './wp/allFiles'
}).any());
server.use('/login', loginRouter);
server.use('/show', showRouter);

// download
showRouter.use('/addDownload', (req, res) => {
	console.log(req.query.hash);
	var Pool = mysql.createPool({
		'host': 'localhost',
		'user': 'root',
		'password': 'whm19971220',
		'database': 'wp'
	});
	Pool.getConnection((err, c) => {
		if (err) {
			console.log(err);
			res.send({
				'ok': 0,
				'msg': '下载失败'
			})
		} else {
			c.query('SELECT download FROM `allFiles` WHERE hashName="' + req.query.hash + '" AND user="' + req.query.user +
				'";', (err, data) => {
					if (err) {
						console.log(err);
						res.send({
							'ok': 0,
							'msg': '数据库连接失败'
						});
						c.end();
					} else {
						// [{download:0}]
						var d = Number(data[0].download) + 1;
						c.query('UPDATE `allFiles` SET download="' + d + '" WHERE hashName="' + req.query.hash + '" AND user="' +
							req.query.user + '";', (err, data) => {
								if (err) {
									console.log(err);
									res.send({
										'ok': 0,
										'msg': '数据库连接失败'
									})
									c.end();
								} else {
									c.query('UPDATE `' + req.query.user + '` SET download="' + d + '" WHERE hashName="' + req.query.hash +
										'";', (err, data) => {
											if (err) {
												console.log(err);
												res.send({
													'ok': 0,
													'msg': '数据库连接失败'
												})
												c.end();
											} else {
												res.send({
													'ok': 1,
													'msg': '下载成功'
												});
											}
											c.end();
										})
								}
							})
					}
				});
		}
	})
})

// usual download
showRouter.use('/addDownload_user', (req, res) => {
	console.log(req.query.hash);
	var Pool = mysql.createPool({
		'host': 'localhost',
		'user': 'root',
		'password': 'whm19971220',
		'database': 'wp'
	});
	Pool.getConnection((err, c) => {
		if (err) {
			console.log(err);
			res.send({
				'ok': 0,
				'msg': '下载失败'
			})
		} else {
			res.send({
				'ok': 1,
				'msg': '下载成功'
			});
		}
		c.end();
	})
})

// show页面
showRouter.use('/showPage', (req, res) => {
	var Pool = mysql.createPool({
		'host': 'localhost',
		'user': 'root',
		'password': 'whm19971220',
		'database': 'wp'
	});
	Pool.getConnection((err, c) => {
		if (err) {
			console.log(err);
			res.send({
				'ok': 0,
				'msg': '数据库连接失败'
			});
		} else {
			c.query('SELECT * FROM `allFiles`;', (err, data) => {
				if (err) {
					console.log(err);
					res.send({
						'ok': 0,
						data: '查询失败'
					})
				} else {
					res.send({
						'ok': 1,
						data: data
					})
				};
				c.end();
			})
		}
	})
})


// 上传文件接口

loginRouter.use('/getfiles', (req, res) => {
	console.log(req.files)
	var newName = req.files[0].path + path.parse(req.files[0].originalname).ext;
	var hashName = req.files[0].filename + path.parse(req.files[0].originalname).ext;
	var thisTime = new Date().toLocaleString();
	fs.rename(req.files[0].path, newName, (err) => {
		if (err) {
			console.log(err);
		} else {
			var Pool = mysql.createPool({
				'host': 'localhost',
				'user': 'root',
				'password': 'whm19971220',
				'database': 'wp'
			});
			Pool.getConnection((err, c) => {
				if (err) {
					console.log(err);
					res.send({
						'ok': 0,
						'msg': '数据库连接失败'
					});
					c.end();
				} else {
					console.log(req.body);
					c.query('INSERT INTO `' + req.body.Fsnames +
						'` (`LastName`,`hashName`,`size`,`type`,`download`,`lastTime`) VALUES("' + req.files[0].originalname +
						'","' + hashName + '","' + req.files[0].size + '","' + path.parse(req.files[0].originalname).ext +
						'","0","' + thisTime + '");', (err, data) => {
							if (err) {
								console.log(err);
								res.send({
									'ok': 0,
									'msg': '数据库存储失败'
								});
								c.end();
							} else {
								// 
								c.query(
									'INSERT INTO `allFiles` (`LastName`,`hashName`,`size`,`type`,`download`,`lastTime`,`user`) VALUES("' +
									req.files[0].originalname + '","' + hashName + '","' + req.files[0].size + '","' + path.parse(req.files[
										0].originalname).ext + '","0","' + thisTime + '","' + req.body.Fsnames + '");', (err, data) => {
										if (err) {
											console.log(err);
											res.send({
												'ok': 0,
												'msg': '存储失败'
											})
										} else {
											res.send({
												'ok': 1,
												'msg': '上传成功',
												'hash': hashName,
												'timer': thisTime
											})
										}
									})
							}
						});
				}
			})
		}
	})
});

// 注册
loginRouter.use('/res', (req, res) => {
	// console.log(req.query);
	var Pool = mysql.createPool({
		'host': 'localhost',
		'user': 'root',
		'password': 'whm19971220',
		'database': 'wp'
	});
	Pool.getConnection((err, c) => {
		if (err) {
			console.log(err);
			res.send({
				'ok': 0,
				'msg': '数据库连接失败'
			})
		} else {
			c.query('SELECT user FROM `usertab` WHERE user="' + req.query.user + '";', (err, data) => {
				if (err) {
					console.log(err);
					res.send({
						'ok': 0,
						'msg': '数据库连接失败'
					});
					c.end();
				} else {
					if (data.length > 0) {
						res.send({
							'ok': 0,
							'msg': '用户名已占用'
						});
						c.end();
					} else {
						c.query('INSERT INTO `usertab` (`user`,`pass`) VALUES("' + req.query.user + '","' + req.query.pass + '");',
							(err, data) => {
								if (err) {
									console.log(err);
									res.send({
										'ok': 0,
										'msg': '数据库连接失败'
									})
									c.end();
								} else {
									c.query(
										`CREATE TABLE ${req.query.user}
										(
										ID int(255) NOT NULL AUTO_INCREMENT,
										LastName varchar(255) NOT NULL,
										hashName varchar(255) NOT NULL,
										lastTime varchar(255) NOT NULL,
										type varchar(255),
										size varchar(255) NOT NULL,
										download varchar(255) NOT NULL,
										PRIMARY KEY (ID)
								)`,
										(err, data) => {
											if (err) {
												console.log(err);
											} else {
												res.send({
													'ok': 1,
													'msg': '恭喜您，注册成功！'
												});
												c.end();
											}
										})
								}
								// c.end();
							});
					}
				}
			})
		}
	})
});

// 删除文件
loginRouter.use('/removeFile', (req, res) => {
	// console.log(req.query)
	fs.unlink('./wp/allFiles/' + req.query.hash, (err) => {
		if (err) {
			console.log(err);
			res.send({
				'ok': 0,
				'msg': '删除失败'
			})
		} else {
			var Pool = mysql.createPool({
				'host': 'localhost',
				'user': 'root',
				'password': 'whm19971220',
				'database': 'wp'
			});
			Pool.getConnection((err, c) => {
				if (err) {
					console.log(err);
					res.send({
						'ok': 0,
						'msg': '删除失败'
					});
				} else {
					c.query('DELETE FROM `' + req.query.user + '` WHERE hashName="' + req.query.hash + '";', (err, data) => {
						if (err) {
							console.log(err);
							res.send({
								'ok': 0,
								'msg': '删除失败'
							});
							c.end();
						} else {
							c.query('DELETE FROM `allFiles` WHERE hashName="' + req.query.hash + '" AND user="' + req.query.user +
								'";', (err, data) => {
									if (err) {
										console.log(err);
										res.send({
											'ok': 0,
											'msg': '删除失败了'
										});
									} else {
										res.send({
											'ok': 1,
											'msg': '删除成功了'
										})
									}
									c.end();
								})
						}
					})
				}
			})
		}
	})
});

// 登录
loginRouter.use('/login', (req, res) => {
	// console.log(req.query);
	var Pool = mysql.createPool({
		'host': 'localhost',
		'user': 'root',
		'password': 'whm19971220',
		'database': 'wp'
	});
	Pool.getConnection((err, c) => {
		if (err) {
			console.log(err);
			res.send({
				'ok': 0,
				'msg': '数据库连接失败'
			})
		} else {
			c.query('SELECT user,pass FROM `usertab` WHERE user="' + req.query.user + '" AND pass="' + req.query.pass + '";',
				(err, data) => {
					if (err) {
						console.log(err);
						res.send({
							'ok': 0,
							'msg': '数据库连接失败'
						});
						c.end();
					} else {
						// [{user:zhixing,pass:wjy19971220}]
						if (data.length > 0) {
							// 
							c.query('SELECT LastName,hashName,size,lastTime,download FROM `' + req.query.user + '`;', (err, data) => {
								if (err) {
									console.log(err);
									res.send({
										'ok': 0,
										'msg': '数据库连接失败'
									})
								} else {
									res.send({
										'ok': 1,
										'msg': '登录成功',
										'data': data
									})
								}
								c.end();
							});
						}
					}
				})
		}
	})
});


server.use('/', express.static('./wp'))
