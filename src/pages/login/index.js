import * as jose from 'jose'
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useAuth } from "src/hooks/useAuth";
import * as MuiMaterial from "@mui/material";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { login, getMe } from "src/services/authenticationService";
import { loginSchema } from "src/validations/loginValidation";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import CustomButton from "src/@core/components/custom/CustomButton";
import CustomTextInput from "src/@core/components/custom/CustomTextInput";
import CustomLinkStyled from "src/@core/components/custom/CustomLinkStyled";
import CustomPasswordInput from "src/@core/components/custom/CustomPasswordInput";
import {
 handleLogin,
 handleLoginCredentials,
} from "src/store/slices/authenticationSlice";

const Login = () => {
 const router = useRouter();
 const { setUser } = useAuth();
 const dispatch = useDispatch();
 const { t } = useTranslation();
 const theme = MuiMaterial.useTheme();
 const [loggingIn, setLoggingIn] = useState(null);
 const hidden = MuiMaterial.useMediaQuery(theme.breakpoints.down("md"));
 const { email, rememberMe } = useSelector((store) => store.authentication);
 const loginIllustrationSource =
  theme.palette.mode === "light" ? "login" : "login-dark";

 const defaultValues = {
  email: "",
  password: "",
  rememberMe,
 };

 const {
  control,
  handleSubmit,
  formState: { errors },
 } = useForm({
  defaultValues,
  mode: "onChange",
  resolver: yupResolver(loginSchema(t)),
 });

 const onSubmit = async ({ email, password, rememberMe }) => {
  setLoggingIn(true);

  try {
    const res = await login({ email, password });
    const me = await getMe();

    dispatch(handleLogin(me?.data));

    setUser(me?.data);

    if (rememberMe) {
      localStorage.setItem("email", email);

      localStorage.setItem("rememberMe", true);

      dispatch(
      handleLoginCredentials({
        email,
        rememberMe,
      })
      );
    } else {
      localStorage.setItem("email", "");

      localStorage.setItem("rememberMe", false);
    }

    router.push(`${me?.data.default_role?.name}/home`);

    toast.success(t("you_have_successfully_logged_in"));
  } catch (error) {
   toast.error(t("something_went_wrong"));
  }

  setLoggingIn(false);
 };

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
     <LoginIllustration
      alt="login-illustration"
      src={`/images/pages/auth-v2-register-illustration-dark.png`}
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
        {t("welcome_to_latydo")}
       </MuiMaterial.Typography>
       <MuiMaterial.Typography sx={{ color: "text.secondary" }}>
        {t("please_sign_in_to_your_account_and_start_the_adventure")}
       </MuiMaterial.Typography>
      </MuiMaterial.Box>
      <form onSubmit={handleSubmit(onSubmit)}>
       <CustomTextInput
        autoFocus
        ariaDescribedBy="login-validation-email-field"
        control={control}
        fullWidth
        isInvalid={errors.email}
        label="email"
        name="email"
        required
        sx={{ mb: 4 }}
        type="email"
       />
       <CustomPasswordInput
        ariaDescribedBy="login-validation-password-field"
        control={control}
        fullWidth
        isInvalid={errors.password}
        label="password"
        name="password"
        required
        sx={{ mb: 2 }}
       />
       <MuiMaterial.Box
        sx={{
         alignItems: "center",
         display: "flex",
         flexWrap: "wrap",
         justifyContent: "space-between",
         mb: 4,
        }}
       >
        <MuiMaterial.FormControl
         disabled={Boolean(errors.email) || Boolean(errors.password)}
        >
         <Controller
          control={control}
          name="rememberMe"
          render={({ field: { value, onChange } }) => {
           return (
            <FormControlLabel
             control={
              <MuiMaterial.Checkbox checked={value} onChange={onChange} />
             }
             label={t("remember_me")}
             sx={{
              "& .MuiFormControlLabel-label": { fontSize: "0.875rem" },
             }}
            />
           );
          }}
          rules={{ required: true }}
         />
        </MuiMaterial.FormControl>
        <CustomLinkStyled href="/forgot_password">
         {t("forgot_password")}
        </CustomLinkStyled>
       </MuiMaterial.Box>
       <CustomButton
        endIcon={<></>}
        fullWidth
        isDisabled={Boolean(errors.email) || Boolean(errors.password)}
        isLoading={loggingIn}
        label="log_in"
        loadingLabel="logging_in"
        size="large"
        sx={{ mb: 8 }}
        type="submit"
        variant="contained"
       />
       <MuiMaterial.Divider
        sx={{
         color: "text.disabled",
         fontSize: "0.875rem",
         mb: (theme) => `${theme.spacing(4)} !important`,
         "& .MuiDivider-wrapper": { px: 4 },
        }}
       >
        {t("or")}
       </MuiMaterial.Divider>
       <MuiMaterial.Box
        sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}
       >
        <MuiMaterial.IconButton
         href="/"
         component={Link}
         sx={{ color: "#db4437" }}
         onClick={(e) => e.preventDefault()}
        >
         <Icon icon="mdi:google" />
        </MuiMaterial.IconButton>
       </MuiMaterial.Box>
      </form>
     </MuiMaterial.Box>
    </MuiMaterial.Box>
   </RightWrapper>
  </MuiMaterial.Box>
 );
};

const FormControlLabel = MuiMaterial.styled(MuiFormControlLabel)(
 ({ theme }) => ({
  "& .MuiFormControlLabel-label": {
   color: theme.palette.text.secondary,
   fontSize: "0.875rem",
  },
 })
);

const LoginIllustration = MuiMaterial.styled("img")(({ theme }) => ({
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

Login.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

Login.guestGuard = true;

export default Login;
