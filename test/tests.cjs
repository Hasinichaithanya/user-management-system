const mocha = require("mocha");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);

describe("User Management API", () => {
  //get-all users api
  describe("GET /get-all API", () => {
    it("It should fetch all the users list", (done) => {
      chai
        .request("http://localhost:5000")
        .get("/get-all")
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have
            .property("message")
            .that.is.equal("Data is successfully fetched");
          response.body.should.have
            .property("total_count")
            .that.is.an("number");
          response.body.should.have.property("usersList").that.is.an("array");
          done();
        });
    });

    it("It should not fetch all the users list with wrong path", (done) => {
      chai
        .request("http://localhost:5000")
        .get("/get-all-users")
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  //post user api
  describe("POST /add-user API", () => {
    it("It should add the user", (done) => {
      const userDetails = {
        name: "Akshitha",
        email: "akshitha@gmail.com",
        password: "Akshitha",
      };
      chai
        .request("http://localhost:5000")
        .post("/add-user")
        .send(userDetails)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have.property("userDetails");
          response.body.should.have
            .property("message")
            .equal("User is added successfully");
          done();
        });
    });

    it("It should not add empty user", (done) => {
      const userDetails = {};
      chai
        .request("http://localhost:5000")
        .post("/add-user")
        .send(userDetails)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have
            .property("message")
            .equal("Cannot add empty user!");
          done();
        });
    });
  });

  //get user based on the ID
  describe("GET /get-user API based on ID", () => {
    it("It should fetch the user details", (done) => {
      const id = "66140648343900c6bcb49010";
      chai
        .request("http://localhost:5000")
        .get("/get-user/" + id)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have
            .property("userDetails")
            .that.is.an("object");
          done();
        });
    });

    it("It should not fetch user details when wrong ID is given", (done) => {
      const id = "66140648343900c6bcb4901";
      chai
        .request("http://localhost:5000")
        .get("/get-user/" + id)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have
            .property("message")
            .equal("Invalid User ID");
          done();
        });
    });
  });

  //get users based on the page and size values
  describe("GET /get-paginated API based page and size", () => {
    it("It should fetch the users based on the page and size values", (done) => {
      const page = 3;
      const size = 2;
      chai
        .request("http://localhost:5000")
        .get("/get-paginated?page=" + page + "&size=" + size)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have.property("userList").that.is.an("array");
          done();
        });
    });

    it("It should not fetch users when wrong page or size is given", (done) => {
      const page = 0;
      const size = 1;
      chai
        .request("http://localhost:5000")
        .get("/get-paginated?page=" + page + "&size=" + size)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property("message");
          done();
        });
    });
  });

  //Update user based on the ID(PUT)
  describe("PUT /update-user API based on ID", () => {
    it("It should update the user details based on the ID", (done) => {
      const id = "661503c989b9a866b4c8cb40";
      const body = {
        name: "Akshitha Gajula",
        password: "Akshitha",
        email: "akshitha@gmail.com",
      };
      chai
        .request("http://localhost:5000")
        .put("/update-user/" + id)
        .send(body)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have.property("message");
          response.body.should.have.property("response");
          done();
        });
    });

    it("It should not update the user details when wrond Id is given", (done) => {
      const id = "661503c989b9a866bc8cb40";
      const body = {
        name: "Akshitha Gajula",
        password: "Akshitha",
        email: "akshitha@gmail.com",
      };
      chai
        .request("http://localhost:5000")
        .put("/update-user/" + id)
        .send(body)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property("message");

          done();
        });
    });
  });

  //Update user based on the ID (PATCH)
  describe("PATCH /update-user API based on ID", () => {
    it("It should update the user details based on the ID", (done) => {
      const id = "661503c989b9a866b4c8cb40";
      const body = {
        name: "Akshitha G",
      };
      chai
        .request("http://localhost:5000")
        .patch("/update-user?id=" + id)
        .send(body)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have
            .property("message")
            .equal("User is updated successfully");
          response.body.should.have.property("response");

          done();
        });
    });

    it("It should not update the user details when wrong ID is given", (done) => {
      const id = "661503c989b9a866bc8cb40";
      const body = {
        name: "Akshitha G",
      };
      chai
        .request("http://localhost:5000")
        .patch("/update-user?id=" + id)
        .send(body)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have
            .property("message")
            .equal("Invalid User ID");

          done();
        });
    });

    it("It should not update more than one field at a time", (done) => {
      const id = "661503c989b9a866b4c8cb40";
      const body = {
        name: "Akshitha G",
        password: "MahaSwini",
      };
      chai
        .request("http://localhost:5000")
        .patch("/update-user?id=" + id)
        .send(body)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have
            .property("message")
            .equal("Only one field should be provided for update");

          done();
        });
    });
  });

  //Delete user based on the ID)
  describe("DELETE /delete-user API based on ID", () => {
    it("It should delete the user details based on the ID", (done) => {
      const id = "661503c989b9a866b4c8cb40";

      chai
        .request("http://localhost:5000")
        .delete("/delete-user/" + id)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have
            .property("message")
            .equal("User is deleted successfully");

          done();
        });
    });

    it("It should not delete the user details when wrong ID is given", (done) => {
      const id = "661503c989b866b4c8cb40";

      chai
        .request("http://localhost:5000")
        .delete("/delete-user/" + id)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have
            .property("message")
            .equal("Invalid user ID, could not delete the user");

          done();
        });
    });
  });
});
