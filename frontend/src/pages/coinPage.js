import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import CoinInfo from "../homePageComponents/CoinInfo";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../homePageComponents/coinsTable";
/* Importing the `CryptoState` object from the `../CryptoContext` file. This object is likely used to
store and manage global state related to cryptocurrency data in the application. */
import { CryptoState } from "../CryptoContext";

const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();

    /* `const { currency, symbol } = CryptoState();` is destructuring the `currency` and `symbol`
    variables from the `CryptoState` object. This object likely contains global state related to
    cryptocurrency data in the application, and `currency` and `symbol` are likely used to determine
    the user's preferred currency and symbol for displaying cryptocurrency data. */
    const { currency, symbol } = CryptoState();

    const fetchCoin = async () => {
        const { data } = await axios.get(SingleCoin(id));

        setCoin(data);
    };

    useEffect(() => {
        fetchCoin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const useStyles = makeStyles((theme) => ({
        
        container: {
            color: "white",
            backgroundColor: "#14161a",
            display: "flex",
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
            },
        },
        sidebar: {
            width: "30%",
            color: "white",
            [theme.breakpoints.down("md")]: {
                width: "100%",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // marginTop: 25, 
            borderRight: "2px solid grey",
            // marginTop: "-10px"
        },
        heading: {
            fontWeight: "bold",
            // marginBottom: 20,
            fontFamily: "Montserrat",
        },
        description: {
            alignItems: "center",
            color: "white",
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: "justify",
            [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "center",
            },
        },
        marketData: {
            color: "white",
            alignSelf: "start",
            padding: 25,
            // paddingTop: 10,
            width: "100%",
            [theme.breakpoints.down("md")]: {
                display: "flex",
                justifyContent: "space-around",
            },
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center",
            },
            [theme.breakpoints.down("xs")]: {
                alignItems: "start",
            },
        },
    }));

    const classes = useStyles();

    if (!coin) return <LinearProgress style={{ backgroundColor: "gold", color: "white" }} />;

    return (
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img
                    src={coin?.image.large}
                    alt={coin?.name}
                    height="200"
                    style={{ marginBottom: 20 }}
                />
                <Typography variant="h3" className={classes.heading}>
                    {coin?.name}
                </Typography>
                <Typography variant="subtitle1" className={classes.description}>
                    {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
                </Typography>
                <div className={classes.marketData}>
                   <span style={{ display: "flex" }}>
                        <Typography variant="h5" className={classes.heading}>
                            Rank:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {numberWithCommas(coin?.market_cap_rank)}
                        </Typography>
                    </span>

                    <span style={{ display: "flex",
                        color: "white",
                            }}>
                        <Typography variant="h5" className={classes.heading}>
                            Current Price:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{
                                fontFamily: "Montserrat",
                            }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.current_price[currency.toLowerCase()]
                            )}
                        </Typography>
                    </span>
                    <span style={{ display: "flex", fontSize:10}}>
                        <Typography variant="h5" className={classes.heading}>
                            Market Cap:
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography
                            variant="h5"
                            style={{
                                fontFamily: "Montserrat",
                                "font-size": "20px"
                            }}
                        >
                            {symbol}{" "}
                            {numberWithCommas(
                                coin?.market_data.market_cap[currency.toLowerCase()]
                                    .toString()
                                    .slice(0, -6)
                            )}
                            M
                        </Typography>
                    </span>
                </div>
            </div>
            <CoinInfo coin={coin} />
        </div>
    );
};

export default CoinPage;