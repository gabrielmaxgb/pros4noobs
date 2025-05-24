import { LoginService } from "~/server/core/auth/loginService";
import { useScope } from "~/server/core/container";
import { defineSafeHandler } from "~/server/utils/handlers";
import { NoContent } from "~/server/utils/response";
import { passwordRecoveryDtoSchema } from "~/shared/user/passwordRecoveryDto";

export default defineSafeHandler(async (event) => {
    const scope = useScope();
    const loginService = scope.get(LoginService);

    const [data, error] = await useBodyWithSchema(passwordRecoveryDtoSchema);
    if (error) {
        return BadRequest();
    }

    const result = await loginService.startPasswordReset(data.email);

    if (result.isFailure) {
        return BadRequest(result.error);
    }

    return NoContent();
})
