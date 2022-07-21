import { User } from "../../../../models/user.model";

export const getUser = async (userid: string) => {
    try {
        const user = await User.findById(userid).populate("projects").lean();

        return {
            error: false,
            message: user,
        };
    } catch (error) {
        return {
            error: true,
            message: JSON.stringify({
                error: error.message,
            }),
        };
    }
};
