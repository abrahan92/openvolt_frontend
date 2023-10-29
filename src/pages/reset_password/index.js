import * as R from "ramda";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Icon from "src/@core/components/icon";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import BlankLayout from "src/@core/layouts/BlankLayout";
import CustomButton from "src/@core/components/custom/CustomButton";
import { resetPassword } from "src/services/authenticationService";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CustomTextInput from "src/@core/components/custom/CustomTextInput";
import CustomLinkStyled from "src/@core/components/custom/CustomLinkStyled";

const ResetPassword = () => {
 const router = useRouter();
 const theme = useTheme();
 const { t } = useTranslation();
 const [changingPassword, setChangingPassword] = useState(false);
 const [password, setPassword] = useState("");
 const [passwordConfirmation, setPasswordConfirmation] = useState("");
 const hidden = useMediaQuery(theme.breakpoints.down("md"));
 const resetPasswordToken = router.query.reset_password_token;
 const forgotPasswordIllustrationSource =
  theme.palette.mode === "light" ? "forgot-password" : "forgot-password-dark";

 const changePassword = async () => {
  if (
   !R.isNil(password) &&
   !R.isNil(passwordConfirmation) &&
   !R.isNil(resetPasswordToken)
  ) {
   setChangingPassword(true);

   try {
    const res = await resetPassword({
     password: password,
     password_confirmation: passwordConfirmation,
     reset_password_token: resetPasswordToken,
    });

    setChangingPassword(false);

    router.push("/login");

    toast.success(t("we_have_successfully_reseted_your_password"));
   } catch (error) {
    setChangingPassword(false);

    router.push("/login");

    toast.error(t("something_went_wrong"));
   }
  }
 };

 return (
  <Box className="content-right" sx={{ backgroundColor: "background.paper" }}>
   {!hidden && (
    <Box
     className="animate__animated animate__fadeIn animate__faster"
     sx={{
      alignItems: "center",
      backgroundColor: "customColors.bodyBg",
      borderRadius: "20px",
      display: "flex",
      flex: 1,
      justifyContent: "center",
      margin: (theme) => theme.spacing(8, 0, 8, 8),
      position: "relative",
     }}
    >
     <ForgotPasswordIllustration
      alt="forgot-password-illustration"
      src={`/images/pages/${forgotPasswordIllustrationSource}.svg`}
     />
    </Box>
   )}
   <RightWrapper>
    <Box
     className="animate__animated animate__fadeIn animate__faster"
     sx={{
      alignItems: "center",
      display: "flex",
      height: "100%",
      justifyContent: "center",
      p: [6, 12],
     }}
    >
     <Box sx={{ maxWidth: 400, width: "100%" }}>
      <Box sx={{ mb: 8 }}>
       <Typography
        sx={{
         fontSize: "1.625rem",
         fontWeight: 500,
         lineHeight: 1.385,
         mb: 1.5,
        }}
       >
        {t("reset_your_password")}
       </Typography>
       <Typography sx={{ color: "text.secondary" }}>
        {t("fill_password_and_password_confirmation")}
       </Typography>
      </Box>
      <CustomTextInput
       autoFocus
       ariaDescribedBy="password-field"
       fullWidth
       label="password"
       name="reset_password"
       required
       sx={{ mb: 6 }}
       type="password"
       setState={setPassword}
       state={password}
       withControl={false}
       onChange={(e) => {
        setPassword(e.target.value);
       }}
      />
      <CustomTextInput
       autoFocus
       ariaDescribedBy="password-confirmation-field"
       fullWidth
       label="password_confirmation"
       name="reset_password_confirmation"
       required
       sx={{ mb: 6 }}
       type="password"
       setState={setPasswordConfirmation}
       state={passwordConfirmation}
       withControl={false}
       onChange={(e) => {
        setPasswordConfirmation(e.target.value);
       }}
      />
      <CustomButton
       onClick={changePassword}
       endIcon={<></>}
       fullWidth
       isDisabled={
        R.isEmpty(password) ||
        R.isEmpty(passwordConfirmation) ||
        password !== passwordConfirmation
       }
       isLoading={changingPassword}
       label="change_password"
       loadingLabel="changing_your_password"
       size="large"
       sx={{ mb: 8 }}
       type="submit"
       variant="contained"
      />
      <Typography sx={{ display: "flex", justifyContent: "center" }}>
       <CustomLinkStyled href="/login">
        <Icon
         fontSize="1.25rem"
         icon="tabler:chevron-left"
         style={{ marginBottom: -6 }}
        />
        <span> {t("log_in")}</span>
       </CustomLinkStyled>
      </Typography>
     </Box>
    </Box>
   </RightWrapper>
  </Box>
 );
};

const ForgotPasswordIllustration = styled("img")(({ theme }) => ({
 marginBottom: theme.spacing(12),
 marginTop: theme.spacing(12),
 maxHeight: 650,
 zIndex: 2,
 [theme.breakpoints.down(1540)]: {
  maxHeight: 550,
 },
 [theme.breakpoints.down("lg")]: {
  maxHeight: 500,
 },
}));

const RightWrapper = styled(Box)(({ theme }) => ({
 width: "100%",
 [theme.breakpoints.up("md")]: {
  maxWidth: 450,
 },
 [theme.breakpoints.up("lg")]: {
  maxWidth: 600,
 },
 [theme.breakpoints.up("xl")]: {
  maxWidth: 750,
 },
}));

ResetPassword.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

ResetPassword.guestGuard = true;

export default ResetPassword;
