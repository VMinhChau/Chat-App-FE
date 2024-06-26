import classCss from "../../../css/Setting/commonSetting.module.css"
import Cover from "../../../assets/images/setting/cover-img01.jpg";
import { useTheme } from "@mui/material/styles";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Stack,
    Typography,
} from "@mui/material";


const SeetingProfile = (e) => {
    const theme = useTheme();
    
    return (
        <>
            <Box
            sx={{
                height: "100%",
                width: "calc(100% - 220px )",
                backgroundColor:
                theme.palette.mode === "light"
                    ? "#FFFFFF"
                    : theme.palette.background.paper,
                borderRadius: "35px",
                overflow: "hidden"
            }}
            >
                <div className={classCss.profile_cover}>
                    <img src={Cover} alt="Cover Image" />
                </div>
                <div className={classCss.profile_avt}>
                    <Avatar
                        src={e.avtImg}
                        sx={{ height: 200, width: 200 }}
                    />
                </div>
                <div className={classCss.profile_info}>
                    <p className={classCss.name}>{e.profileName}</p>
                    <ul className={classCss.info_lst}>
                        <li className={classCss.info_item}>
                            <p className={classCss.intem_head}>Email</p>
                            <p className={classCss.intem_txt}>{e.email}</p>
                        </li>
                        {/* <li className={classCss.info_item}>
                            <p className={classCss.intem_head}>Date of birth</p>
                            <p className={classCss.intem_txt}></p>
                        </li>
                        <li className={classCss.info_item}>
                            <p className={classCss.intem_head}>Phone number</p>
                            <p className={classCss.intem_txt}>0914 755 011</p>
                        </li> */}
                    </ul>
                </div>
            </Box>
        </>
    )
}

export default SeetingProfile;