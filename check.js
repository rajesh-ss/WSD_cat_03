/**
 * Required variables
 */
const mysql = require("mysql2");
const express = require("express");
var app = express();
const parser = require("body-parser");
app.use(parser.json());
const fs = require("fs");

/**
 * Connection Part
 */
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "9382373682",
  database: "CUCS"
});

/**
 * connection part
 */
connection.connect((err) => {
  if (!err) console.log("success");
  else console.log("not success");
});
app.listen(3000, () => console.log("sever startes at 3000..."));

/**
 * ------------------------------------------------------------------------
 *               To fetch all the records and store in json
 * ------------------------------------------------------------------------
 */
app.get("/", (req, res) => {
  connection.query("SELECT * FROM blossoms", (err, rows, fields) => {
    if (!err) {
      res.send("\nAll Table\n" + JSON.stringify(rows));
      fs.writeFile(
        "records.json",
        JSON.stringify(rows),
        "utf8",
        function (err) {
          if (err) {
            console.log("error when writing to file.");
            return console.log(err);
          }
        }
      );
    } else {
      console.log("erro" + err);
    }
  });
});

/**
 * ----------------------------___ Q-01___---------------------------------
 *                         create the databse part
 * --------------------------------------------------------------------------
 */
app.get("/cre", (req, res) => {
  connection.query(
    "create table BLOSSOMS(S_RegNo int primary key, S_Name varchar(20), S_class varchar(20), S_Event varchar(20), S_Team varchar(20))",
    (err, rows, fields) => {
      if (!err) res.send("created table Blossoms  " + JSON.stringify(rows));
      else console.log("error" + err);
    }
  );
});

/**
 * ----------------------------___ Q-02-i___---------------------------------
 *                      inserting the values part
 * ------------------------------------------------------------------------
 */
app.get("/ins", (req, res) => {
  connection.query(
    "insert into blossoms values(2147227, 'blahlah', '2MCA-B', 'ahh ahh', 'random')",
    (err, rows, fields) => {
      if (!err) res.send("Inserted column " + JSON.stringify(rows));
      else console.log("error" + err);
    }
  );
});

/**
 * ----------------------------___ Q-02-ii___---------------------------------
 *                     Deleting the record by S_RegNo
 * ------------------------------------------------------------------------
 */
app.get("/del/:S_RegNo", (req, res) => {
  connection.query(
    "DELETE FROM blossoms WHERE S_RegNo=?",
    [req.params.S_RegNo],
    (err, rows, fields) => {
        if (!err) res.send("Deleted the seleted record  " + JSON.stringify(rows));
      else console.log("erro" + err);
    }
  );
});

/**
 * ----------------------------___ Q-03___---------------------------------
 *                   updating the data based on team 
 * ------------------------------------------------------------------------
 */
 app.get("/upd", (req, res) => {
    connection.query(
      "UPDATE blossoms SET S_Event='singing' WHERE S_Team ='techRev' ",
      (err, rows, fields) => {
        if (!err) res.send("updating the data " + JSON.stringify(rows));
        else console.log("error" + err);
      }
    );
  });


/**
 * ----------------------------____ Q-04 ____---------------------------------
 *                  Display_student based on event type
 * ------------------------------------------------------------------------
 */
 app.get("/eve/:S_Event", (req, res) => {
    connection.query(
      "SELECT * FROM blossoms where S_Event=?",
      [req.params.S_Event],
      (err, rows, fields) => {
        if (!err) res.send(rows);
        else console.log("erro" + err);
      }
    );
  });

/**
 * ----------------------------___ Q-05___---------------------------------
 *                     select the record by team name
 * ------------------------------------------------------------------------
 */
app.get("/seeByTeamName/:S_Team", (req, res) => {
  connection.query(
    "SELECT * FROM blossoms where S_Team=?",
    [req.params.S_Team],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log("erro" + err);
    }
  );
});