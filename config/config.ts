export const baseUrl = (): string => {
    return process.env.BASE_URL || "https://portal.herpower.gov.bd/api";
}
export const adminMail = (): string => {
    return process.env.ADMIN_URL || "herpowerproject@doict.gov.bd";
}