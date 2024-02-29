const sql = require("./db.js");

// constructor
const User = function(user) {
  this.user_id = user.user_id;
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.profile_picture = user.profile_picture;
  this.bio = user.bio;
  this.gender = user.gender;
  this.dob = user.dob;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO phu_tin_and_ho_an.User SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { user_id: res.insertId, ...newUser });
    result(null, { user_id: res.insertId, ...newUser });
  });
};

User.findById = (user_id, result) => {
  sql.query(`SELECT * FROM phu_tin_and_ho_an.User WHERE user_id = ?`, user_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the user_id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (username, result) => {
  let query = "SELECT * FROM phu_tin_and_ho_an.User";

  if (username) {
    query += ` WHERE username LIKE '%${username}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (user_id, user, result) => {
  sql.query(
    "UPDATE phu_tin_and_ho_an.User SET username = ?, email = ?, password = ?, profile_picture = ?, bio = ?, gender = ?, dob = ? WHERE user_id = ?",
    [user.username, user.email, user.password, user.profile_picture, user.bio, user.gender, user.dob, user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the user_id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { user_id: user_id, ...user });
      result(null, { user_id: user_id, ...user });
    }
  );
};

User.remove = (user_id, result) => {
  sql.query("DELETE FROM phu_tin_and_ho_an.User WHERE user_id = ?", user_id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the user_id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with user_id: ", user_id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM phu_tin_and_ho_an.User", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
