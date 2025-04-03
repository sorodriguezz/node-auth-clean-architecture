import {AuthDatasource, CustomError, RegisterUserDto, UserEntity} from "../../domain";
import {UserModel} from "../../data";
import {BcryptAdapter} from "../../config";
import {UserMapper} from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDataSourceImpl implements AuthDatasource {

    constructor(
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    ) {
    }

    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const {name, email, password} = registerUserDto;

        try {
            const exists = await UserModel.findOne({email});
            if (exists) throw CustomError.badRequest("User already exists");

            const user = await UserModel.create({
                name: name,
                email: email,
                password: this.hashPassword(password),
            });

            await user.save();

            return UserMapper.userEntityFromObject(user);
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }

            throw CustomError.internalServerError();
        }
    }
}