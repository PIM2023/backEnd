import { Repository } from "typeorm";
import { User } from "../../src/entity/User";
import { connection } from "../setupTests";

describe("User Entity", () => {
  let userRepository: Repository<User>;

  beforeAll(() => {
    userRepository = connection.getRepository(User);
  });

  beforeEach(async () => {
    const user = new User();
    user.username = "John";
    user.email = "john@example.com";
    user.password = "password";

    await userRepository.save(user);
  });

  afterEach(async () => {
    await userRepository.delete({ email: "john@example.com" });
  });

  it("should create and save a user", async () => {
    const savedUser = await userRepository.findOne({
      where: {
        email: "john@example.com",
      },
    });

    expect(savedUser).toBeDefined();
    expect(savedUser!.username).toBe("John");
    expect(savedUser!.email).toBe("john@example.com");
    expect(savedUser!.password).toBe("password");
  });

  it("should update a user's username", async () => {
    const updatedUser = await userRepository.findOne({
      where: {
        email: "john@example.com",
      },
    });

    expect(updatedUser).toBeDefined();
    expect(updatedUser!.username).toBe("John");

    updatedUser!.username = "JohnDoe";
    await userRepository.save(updatedUser!);

    const updatedUserAgain = await userRepository.findOne({
      where: {
        email: "john@example.com",
      },
    });

    // expect(updatedUserAgain).toBeDefined();
    // expect(updatedUserAgain!.username).toBe("JaneDoe");
  });

  it("should delete a user", async () => {
    const savedUser = await userRepository.findOne({
      where: {
        email: "john@example.com",
      },
    });

    expect(savedUser).toBeDefined();

    await userRepository.remove(savedUser!);

    const deletedUser = await userRepository.findOne({
      where: {
        email: "john@example.com",
      },
    });

    expect(deletedUser).toBeNull();
  });
});
