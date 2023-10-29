import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "src/hooks/useAuth";
import * as MuiMaterial from "@mui/material";
import { useTranslation } from "react-i18next";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { confirmEmail } from "src/services/authenticationService";
import BlankLayout from "src/@core/layouts/BlankLayout";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import CustomButton from "src/@core/components/custom/CustomButton";

const ConfirmEmail = () => {
 const router = useRouter();
 const { t } = useTranslation();
 const theme = MuiMaterial.useTheme();
 const [confirmingEmail, setConfirmingEmail] = useState(true);
 const [confirmedEmail, setConfirmedEmail] = useState(false);
 const hidden = MuiMaterial.useMediaQuery(theme.breakpoints.down("md"));
 const urlToken = router.query.confirmation_token;
 const confirmIllustrationSource =
  theme.palette.mode === "light"
   ? "auth-v2-verify-email-illustration-light"
   : "auth-v2-verify-email-illustration-dark";

 const redirectToLogin = () => {
  router.push("/login");
 };

 useEffect(() => {
  const confirmData = async () => {
   if (urlToken) {
    try {
     const res = await confirmEmail(urlToken);

     setConfirmingEmail(false);
     setConfirmedEmail(true);

     toast.success(t("we_have_successfully_confirmed_the_user_email"));
    } catch (error) {
     setConfirmingEmail(false);
     setConfirmedEmail(false);

     toast.error(t("something_went_wrong"));
    }
   }
  };

  confirmData();
 }, [urlToken]);

 return (
  <MuiMaterial.Box
   className="content-right"
   sx={{ backgroundColor: "background.paper" }}
  >
   {!hidden && (
    <MuiMaterial.Box
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
     <ConfirmIllustration
      alt="confirm-email-illustration"
      src={`/images/pages/${confirmIllustrationSource}.png`}
     />
    </MuiMaterial.Box>
   )}
   <RightWrapper>
    <MuiMaterial.Box
     className="animate__animated animate__fadeIn animate__faster"
     sx={{
      alignItems: "center",
      display: "flex",
      height: "100%",
      justifyContent: "center",
      p: [6, 12],
     }}
    >
     <MuiMaterial.Box sx={{ maxWidth: 400, width: "100%" }}>
      <MuiMaterial.Box sx={{ mb: 8 }}>
       <MuiMaterial.Typography
        sx={{
         fontSize: "1.625rem",
         fontWeight: 500,
         lineHeight: 1.385,
         mb: 1.5,
        }}
       >
        {confirmingEmail
         ? t("wait_a_moment")
         : confirmedEmail
         ? t("congratulations")
         : t("something_went_wrong")}
       </MuiMaterial.Typography>
       <MuiMaterial.Typography sx={{ color: "text.secondary" }}>
        {confirmingEmail
         ? t("trying_to_confirm_the_user_email")
         : confirmedEmail
         ? t("we_have_successfully_confirmed_the_user_email")
         : t("we_are_sorry_but_we_could_not_confirm_the_user_email")}
       </MuiMaterial.Typography>
       <CustomButton
        endIcon={<></>}
        fullWidth
        isLoading={confirmingEmail}
        label="back_to_login"
        loadingLabel="confirming_email"
        size="large"
        sx={{ mb: 8, mt: 3 }}
        type="submit"
        variant="contained"
        onClick={redirectToLogin}
       />
      </MuiMaterial.Box>
     </MuiMaterial.Box>
    </MuiMaterial.Box>
   </RightWrapper>
  </MuiMaterial.Box>
 );
};

const ConfirmIllustration = MuiMaterial.styled("img")(({ theme }) => ({
 marginBottom: theme.spacing(12),
 marginTop: theme.spacing(12),
 maxHeight: 680,
 zIndex: 2,
 [theme.breakpoints.down(1540)]: {
  maxHeight: 550,
 },
 [theme.breakpoints.down("lg")]: {
  maxHeight: 500,
 },
}));

const RightWrapper = MuiMaterial.styled(MuiMaterial.Box)(({ theme }) => ({
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

ConfirmEmail.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

ConfirmEmail.guestGuard = true;

export default ConfirmEmail;
