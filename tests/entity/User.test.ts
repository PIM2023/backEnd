import { User } from "../../src/entity/User";
import { connection } from "../setupTests";

describe("User Entity", () => {
  it("should create and save a user", async () => {
    const userRepository = connection.getRepository(User);

    const user = new User();
    user.username = "John";
    user.email = "john@example.com";
    user.password = "password";

    await userRepository.save(user);

    const savedUser = await userRepository.findOneBy({
      email: "john@example.com",
    });
    expect(savedUser).toBeDefined();
    expect(savedUser!.username).toBe("John");
    expect(savedUser!.email).toBe("john@example.com");
    expect(savedUser!.password).toBe("password");
  });
});
