// https://www.codewars.com/kata/json-account-updater/train/javascript

// My solution

function updateAccounts(accounts, logons) {

  logons = logons.Logons.sort((one,two) => one.Date.getTime() - two.Date.getTime())
  accounts = accounts.Accounts


  logons.forEach(log => {
    const acc = accounts.find(acc => acc.Id == log.Id)
    if (acc) {
      acc.LogonCount += 1
      if (log.Date.getTime() > acc.LastLogon.getTime()){
        acc.LastLogon = log.Date
        acc.Name = log.Name ? log.Name : acc.Name
      }
    } else {
      accounts.push(
        {
        "Id": log.Id,
        "Name": log.Name,
        "LogonCount": 1,
        "LastLogon": log.Date
        }
      )
     }
  })

  accounts.sort((one,two) => one.Id - two.Id)

  return {"Accounts": accounts}
}


// OFFICIAL SOLUTION

function updateAccounts(accounts, logons){
  logons.Logons.sort((a,b)=>a.Date-b.Date);
  logons.Logons.forEach(l=>{
    var acc = accounts.Accounts.find(a=>a.Id===l.Id);
    if(acc) {
      acc.LogonCount++;
      if(acc.LastLogon<l.Date) {
        if(l.Name) acc.Name = l.Name;
        acc.LastLogon = l.Date;
      }
    } else accounts.Accounts.push({Id: l.Id, Name: l.Name, LogonCount: 1, LastLogon: l.Date});
  });
  accounts.Accounts.sort((a,b)=>a.Id-b.Id);
  return accounts;
}


// Test cases

describe("The logon administrator", function () {
    it("returns the list of accounts", function () {
        var logons = {
            "Logons" : []
        };
        var accounts = {
            "Accounts": [
                {
                    "Id": 21,
                    "Name": "John Shepherd",
                    "LogonCount" : 13,
                    "LastLogon" : new Date(2017, 1, 14, 16, 15, 6, 111)
                },
                {
                    "Id": 12,
                    "Name": "Frank Matthews",
                    "LogonCount": 1,
                    "LastLogon": new Date(2017, 1, 15, 14, 26, 31, 821)
                }
            ]
        };
        var expected = {
            "Accounts": [
                {
                    "Id": 12,
                    "Name": "Frank Matthews",
                    "LogonCount": 1,
                    "LastLogon": new Date(2017, 1, 15, 14, 26, 31, 821)
                },
                {
                    "Id": 21,
                    "Name": "John Shepherd",
                    "LogonCount" : 13,
                    "LastLogon" : new Date(2017, 1, 14, 16, 15, 6, 111)
                }
            ]
        };
        assert(expected, updateAccounts(accounts, logons));
    });
    it("returns the list of updated accounts", function () {
        var logons = {
            "Logons": [
                {
                    "Id": 21,
                    "Name": "John F. Shepherd",
                    "Date": new Date(2017, 1, 24, 22, 13, 16, 241)
                }
            ]
        };
        var accounts = {
            "Accounts": [
                {
                    "Id": 21,
                    "Name": "John Shepherd",
                    "LogonCount": 13,
                    "LastLogon": new Date(2017, 1, 14, 16, 15, 6, 111)
                }
            ]
        };
        var expected = {
            "Accounts": [
                {
                    "Id": 21,
                    "Name": "John F. Shepherd",
                    "LogonCount": 14,
                    "LastLogon": new Date(2017, 1, 24, 22, 13, 16, 241)
                }
            ]
        };
        assert(expected, updateAccounts(accounts, logons));
    });
    it("does not update a name when empty", function () {
        var logons = {
            "Logons": [
                {
                    "Id": 21,
                    "Name": "",
                    "Date": new Date(2017, 1, 24, 22, 13, 16, 241)
                }
            ]
        };
        var accounts = {
            "Accounts": [
                {
                    "Id": 21,
                    "Name": "John Shepherd",
                    "LogonCount": 13,
                    "LastLogon": new Date(2017, 1, 14, 16, 15, 6, 111)
                }
            ]
        };
        var expected = {
            "Accounts": [
                {
                    "Id": 21,
                    "Name": "John Shepherd",
                    "LogonCount": 14,
                    "LastLogon": new Date(2017, 1, 24, 22, 13, 16, 241)
                }
            ]
        };
        assert(expected, updateAccounts(accounts, logons));
    });
    it("only updates last logon date and name when a logon is later", function () {
        var logons = {
            "Logons": [
                {
                    "Id": 21,
                    "Name": "John F. Shepherd",
                    "Date": new Date(2016, 9, 23, 11, 13, 16, 541)
                }
            ]
        };
        var accounts = {
            "Accounts": [
                {
                    "Id": 21,
                    "Name": "John Shepherd",
                    "LogonCount": 13,
                    "LastLogon": new Date(2017, 1, 14, 16, 15, 6, 111)
                }
            ]
        };
        var expected = {
            "Accounts": [
                {
                    "Id": 21,
                    "Name": "John Shepherd",
                    "LogonCount": 14,
                    "LastLogon": new Date(2017, 1, 14, 16, 15, 6, 111)
                }
            ]
        };
        assert(expected, updateAccounts(accounts, logons));
    });
    it("adds a new account to the list", function () {
        var logons = {
            "Logons": [
                {
                    "Id": 5,
                    "Name": "Sarah Miller",
                    "Date": new Date(2017, 1, 23, 10, 12, 4, 545)
                },
                {
                    "Id": 5,
                    "Name": "",
                    "Date": new Date(2017, 1, 25, 10, 12, 4, 545)
                },
                {
                    "Id": 5,
                    "Name": "Sarah Parker-Miller",
                    "Date": new Date(2017, 1, 24, 10, 12, 4, 545)
                }
            ]
        };
        var accounts = {
            "Accounts": [
                {
                    "Id": 21,
                    "Name": "John Shepherd",
                    "LogonCount": 13,
                    "LastLogon": new Date(2017, 1, 14, 16, 15, 6, 111)
                }
            ]
        };
        var expected = {
            "Accounts": [
                {
                    "Id": 5,
                    "Name": "Sarah Parker-Miller",
                    "LogonCount": 3,
                    "LastLogon": new Date(2017, 1, 25, 10, 12, 4, 545)
                },
                {
                    "Id": 21,
                    "Name": "John Shepherd",
                    "LogonCount": 13,
                    "LastLogon": new Date(2017, 1, 14, 16, 15, 6, 111)
                }
            ]
        };
        assert(expected, updateAccounts(accounts, logons));
    });
});


describe("Randomized test", function () {
    it("can do 5,000,000 updates", function () {
        var e = { "Accounts": [] };
        var l = { "Logons": [] };
        var a = { "Accounts": [] };
        for (var i = 1; i <= 1000; i++) {
            var name = Math.floor(Math.random() * 10000 + 1000).toString().substring(4);
            var date = getRandomDate();
            e.Accounts.push({
                "Id": i,
                "Name": name,
                "LogonCount": 1,
                "LastLogon": date
            });
            l.Logons.push({
                "Id": i,
                "Name": name,
                "Date": date
            });
        }
        var a = updateAccounts(a, l);
        return;

        for (var j = 1; j <= 1000; j++) {
            var l = { "Logons": [] };
            for (var i = 1; i <= 5000; i++) {
                var id = Math.floor(Math.random() * 1000 + 1);
                var name = (Math.random() > .2) ? "" : Math.floor(Math.random() * 10000 + 1000).toString().substring(4);
                var logon = {
                    "Id": id,
                    "Name": name,
                    "Date": getRandomDate()
                };
                l.Logons.push(logon);
                var account = a.Accounts[id - 1];
                account.LogonCount++;
                if (account.LastLogon.getTime() < logon.Date.getTime()) {
                    if (logon.Name || logon.Name.length > 0) account.Name = logon.Name;
                    account.LastLogon = logon.Date;
                }
            }
            a.Accounts = a.Accounts.sort(function (a, b) { return Math.floor(Math.random() * 10) - 5; });
            updateAccounts(a, l);
        }
        assert(e, a);
    });
});

function getRandomDate() {
    var y = Math.floor(Math.random() * 17 + 2000);
    var m = Math.floor(Math.random() * 12 + 1);
    var d = Math.floor(Math.random() * 28 + 1);
    var h = Math.floor(Math.random() * 24);
    var n = Math.floor(Math.random() * 60);
    var s = Math.floor(Math.random() * 60);
    var ms = Math.floor(Math.random() * 1000);
    return new Date(y, m, d, h, n, s, ms);
}

function assert(e, a) {
    Test.assertEquals(a.Accounts.length, e.Accounts.length);
    for (var i = 0; i < e.Accounts.length; i++) {
        Test.assertEquals(a.Accounts[i].Id, e.Accounts[i].Id);
        Test.assertEquals(a.Accounts[i].Name, e.Accounts[i].Name);
        Test.assertEquals(a.Accounts[i].LogonCount, e.Accounts[i].LogonCount);
        Test.assertEquals(a.Accounts[i].LastLogon.getTime(), e.Accounts[i].LastLogon.getTime());
    }
}

