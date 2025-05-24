import { Result } from "~/server/utils/result";
import { TCreateUser_DTO } from "~/shared/user";
import { UserRecord, User } from "./user"
import { useConfigurationAsync } from "../configuration/useConfiguration";
import * as argon2 from 'argon2';
import { injectable } from 'inversify';

@injectable()
export class UserService {
    public async createUser(data: TCreateUser_DTO): Promise<Result<User>> {
        const existingUser = await UserRecord.findOne({ email: data.email });
        if (existingUser) {
            return Result.Fail('User already exists');
        }

        const techsConfig = await useConfigurationAsync('technologies');
        const techs = techsConfig?.split(',').map((tech: string) => tech.trim()) || [];

        if (!data.technologies.every((tech) => techs.includes(tech))) {
            return Result.Fail('Invalid technology selected.');
        }

        const passwordHash = await argon2.hash(data.password, { // TODO(titosilva): move this to a password service
            type: argon2.argon2id, // Uses Argon2id for resistance to side-channel attacks
            memoryCost: 2 ** 16,   // 64 MB of memory (standard for Argon2)
            timeCost: 3,           // Iterations (3 is generally considered secure)
            parallelism: 1,        // Number of threads (1 for server-side hashing)
            hashLength: 32,        // Length of the resulting hash
        });

        // Create a new user
        const newUser = new UserRecord({
            name: data.name,
            email: data.email,
            password: data.password, // Note: Hash the password in production
            passwordHash: passwordHash,
            technologies: data.technologies,
            initialRole: data.startRole,
            startedAsSuperBeginner: data.startedAsSuperBeginner,
            roles: [data.startRole],
        });

        await newUser.save();

        return Result.Ok(newUser.toObject());
    }

    // TODO(titosilva): move this to a repository
    public async findUserByEmail(email: string): Promise<Result<User>> {
        const user = await UserRecord.findOne({ email });
        if (!user) {
            return Result.Fail('User not found');
        }

        return Result.Ok(user.toObject());
    }
}