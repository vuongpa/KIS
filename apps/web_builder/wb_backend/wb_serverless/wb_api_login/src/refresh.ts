import { getEnvConfig } from "@kis/common/src/utils/config";
import { verifyRefreshToken, generateTokens } from "@kis/common/src/utils/auth";

export const refresh = async (req: any, res: any) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.status(400).json({ error: "Refresh Token required" });

    const envConfig = getEnvConfig();
    const decoded: any = await verifyRefreshToken(refreshToken, envConfig.REFRESH_SECRET ?? '');
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      decoded.userId,
      envConfig.JWT_SECRET ?? '',
      envConfig.REFRESH_SECRET ?? ''
    );

    return res.json({ accessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.status(403).json({ error: "Invalid refresh token" });
  }
}
