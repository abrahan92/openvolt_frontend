import * as R from "ramda";
import { useState } from "react";
import { toast } from "react-hot-toast";
import Icon from "src/@core/components/icon";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import BlankLayout from "src/@core/layouts/BlankLayout";
import CustomButton from "src/@core/components/custom/CustomButton";
import { forgotPassword } from "src/services/authenticationService";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CustomTextInput from "src/@core/components/custom/CustomTextInput";
import CustomLinkStyled from "src/@core/components/custom/CustomLinkStyled";

const ForgotPassword = () => {
 const theme = useTheme();
 const { t } = useTranslation();
 const [email, setEmail] = useState("");
 const [sendingEmail, setSendingEmail] = useState(false);
 const hidden = useMediaQuery(theme.breakpoints.down("md"));
 const forgotPasswordIllustrationSource =
  theme.palette.mode === "light" ? "forgot-password" : "forgot-password-dark";

 const onSubmit = async () => {
  setSendingEmail(true);

  if (!R.isNil(email)) {
   try {
    const res = await forgotPassword(email);

    setEmail("");
    setSendingEmail(false);

    toast.success(
     t("we_have_sent_you_an_email_with_instructions_to_reset_your_password")
    );
   } catch (error) {
    setSendingEmail(false);
    setEmail("");

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
        {t("forgot_password")}
       </Typography>
       <Typography sx={{ color: "text.secondary" }}>
        {t(
         "enter_your_email_and_well_send_you_instructions_to_reset_your_password"
        )}
       </Typography>
      </Box>
      <CustomTextInput
       autoFocus
       ariaDescribedBy="forgot-password-validation-email-field"
       fullWidth
       label="email"
       name="email"
       required
       sx={{ mb: 6 }}
       type="email"
       setState={setEmail}
       state={email}
       withControl={false}
       onChange={(e) => {
        setEmail(e.target.value);
       }}
      />
      <CustomButton
       endIcon={<></>}
       fullWidth
       isDisabled={R.isEmpty(email)}
       isLoading={sendingEmail}
       label="send_reset_link"
       loadingLabel="sending_email_instructions"
       size="large"
       sx={{ mb: 8 }}
       type="submit"
       variant="contained"
       onClick={onSubmit}
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

ForgotPassword.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

ForgotPassword.guestGuard = true;

export default ForgotPassword;
