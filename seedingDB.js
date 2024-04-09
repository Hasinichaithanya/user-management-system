const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://hasinichaithanya04:6hr9XjbxpsanJlOJ@cluster0.suc7fzf.mongodb.net/user_test_data?retryWrites=true&w=majority&appName=Cluster0";
let db;
const client = new MongoClient(uri);
client
  .connect()
  .then(async (res) => {
    console.log("connection is successful");
    try {
      db = client.db("user_test_data");
      const users = db.collection("users");

      const usersList = [
        {
          name: "Margaery Tyrell",
          email: "natalie_dormer@gameofthron.es",
          password:
            "$2b$12$AjC.876rd2dgsSIu.5c4qembdVfdDajMIgueMYuOBoskJUGHzpw46",
        },
        {
          name: "Bronn",
          email: "jerome_flynn@gameofthron.es",
          password:
            "$2b$12$9rzMIF3lv7kASdTdam2eOOjWrDSN.qi2hpY5tyOfDPe545XfrQHpu",
        },
        {
          name: "Ygritte",
          email: "rose_leslie@gameofthron.es",
          password:
            "$2b$12$knwl2v71.oOhFA1W.Yenle8kil56LqhWCOvM7/JVy8E5YrOoZisUi",
        },
        {
          name: "Doreah",
          email: "roxanne_mckee@gameofthron.es",
          password:
            "$2b$12$3M34QX9A/7jNLn9neSddUeW5oJfcl5OYOqYUL.7L87/ThA8Xbfug6",
        },
        {
          name: "Maester Aemon",
          email: "peter_vaughan@gameofthron.es",
          password:
            "$2b$12$uOefAK8L28vlzZ9lsZV2Q.LplAND.FPwKHPmZ7wgXeO/F0mbVR1b2",
        },
        {
          name: "Othell Yarwyck",
          email: "brian_fortune@gameofthron.es",
          password:
            "$2b$12$RfLlYF.8Vxj4MXILL2kvIuyuAO8rN3KR6//UL1a6rNIfNgBaASS66",
        },
        {
          name: "Beric Dondarrion",
          email: "richard_dormer@gameofthron.es",
          password:
            "$2b$12$CHeWRV3bBssK0MR1o4FLcOCmFLaPIPTA0KzKI0aWYDnXCKm98MbJy",
        },
        {
          name: "Greg Powell",
          email: "greg_powell@fakegmail.com",
          password:
            "$2b$12$XpveUB6kIiU3zG5aABw26OitIB7cDBbSUWJAz4WDF4XXyNNJ/mp76",
        },
        {
          name: "Emily Ellis",
          email: "emily_ellis@fakegmail.com",
          password:
            "$2b$12$UuCb5RqPEgheoLlwOF/Jb.x9gpFVmD30oUwpSRKljwo8pBUmWT6eG",
        },
        {
          name: "Megan Richards",
          email: "megan_richards@fakegmail.com",
          password:
            "$2b$12$iDxjjcgBA.Q9zjTlOD4KJuhPJx6gw5GecbDWCbVmfzzv2rqNbC2vC",
        },
        {
          name: "Brandon Hardy",
          email: "brandon_hardy@fakegmail.com",
          password:
            "$2b$12$7qxHDP2xlgztpQITlwjlBugE2ned0nRmm22Gu1mK34fZJvh5IE4SO",
        },
        {
          name: "Yvette Roth",
          email: "yvette_roth@fakegmail.com",
          password:
            "$2b$12$JmceK9VLl7aY/uF9.ZdLTOuj0y5xR3jjvDZVyFCCPQT/lly5IocIm",
        },
        {
          name: "Michael Day",
          email: "michael_day@fakegmail.com",
          password:
            "$2b$12$1BdlPh4Imkw8kn7aCgEWsOCt1DED7cFTMlVOf62k6lGxEvQEe1L56",
        },
        {
          name: "Denise Davidson",
          email: "denise_davidson@fakegmail.com",
          password:
            "$2b$12$kjWPMnQwGlwe7NGI0NdE9uq3KGvJ8jA0bJILkEUXFE9tzPVjwzJ1a",
        },
        {
          name: "Barbara Gonzalez",
          email: "barbara_gonzalez@fakegmail.com",
          password:
            "$2b$12$qxLcDfjy7RdjfJbrFRHntu0kzVnXzJKED0on8TZ84dLlSCKKkaJt2",
        },
        {
          name: "Victoria Sanders",
          email: "victoria_sanders@fakegmail.com",
          password:
            "$2b$12$/2aikvro4gXgcp01Z8qIj.s2s53lpVcLQRbG/9VNbHa4i3ajo5dc.",
        },
        {
          name: "Jerry Cabrera",
          email: "jerry_cabrera@fakegmail.com",
          password:
            "$2b$12$HEimsC0UBidI9AYqPU4Mr.P8UZVO6zsZm2VUFVeuA467fdqp8WJDu",
        },
        {
          name: "Lisa Russo",
          email: "lisa_russo@fakegmail.com",
          password:
            "$2b$12$pOdj440b9rps82eCfXzCiONHjBo9zowp62kNDdQSRVPMwGJmxAk0W",
        },
        {
          name: "Jennifer Frazier",
          email: "jennifer_frazier@fakegmail.com",
          password:
            "$2b$12$Xm1ktF5woIqEw5q00xCnZO.PwJDWi9VIrbbrMemqv5zzF1zJGN2AC",
        },
        {
          name: "Ashlee Hart",
          email: "ashlee_hart@fakegmail.com",
          password:
            "$2b$12$S707opDk6HG/Lqk7MaHeQ.1N36I6kEUOhRv/RQEHZUbw89xAuO6Ju",
        },
        {
          name: "Magical Mr. Mistoffelees",
          email: "magicz@cats.com",
          password: "somehashedpw",
        },
      ];
      const result = await users.insertMany(usersList);
      console.log("Data seeding is successful");
      console.log("Inserted Count", result.insertedCount);
    } catch (err) {
      console.error(err);
    }
  })
  .catch((err) => console.error("Error connecting to database: ", err));
