import {useEffect, useState} from 'react';
import {
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    Slider,
    TextField,
    Select,
    FormControl,
    InputLabel,
    MenuItem
} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import NoUISlider from "../components/NoUISlider";

import {v4 as uuid} from 'uuid'
import './Page2.css'

const config = require('../config.json');
//region state data
const allStates = [{name: 'AK - Alaska'}, {name: 'AL - Alabama'}, {name: 'AR - Arkansas'}, {name: 'AS - American Samoa'}, {name: 'AZ - Arizona'}, {name: 'CA - California'}, {name: 'CO - Colorado'}, {name: 'CT - Connecticut'}, {name: 'DC - District of Columbia'}, {name: 'DE - Delaware'}, {name: 'FL - Florida'}, {name: 'GA - Georgia'}, {name: 'GU - Guam'}, {name: 'HI - Hawaii'}, {name: 'IA - Iowa'}, {name: 'ID - Idaho'}, {name: 'IL - Illinois'}, {name: 'IN - Indiana'}, {name: 'KS - Kansas'}, {name: 'KY - Kentucky'}, {name: 'LA - Louisiana'}, {name: 'MA - Massachusetts'}, {name: 'MD - Maryland'}, {name: 'ME - Maine'}, {name: 'MI - Michigan'}, {name: 'MN - Minnesota'}, {name: 'MO - Missouri'}, {name: 'MS - Mississippi'}, {name: 'MT - Montana'}, {name: 'NC - North Carolina'}, {name: 'ND - North Dakota'}, {name: 'NE - Nebraska'}, {name: 'NH - New Hampshire'}, {name: 'NJ - New Jersey'}, {name: 'NM - New Mexico'}, {name: 'NV - Nevada'}, {name: 'NY - New York'}, {name: 'OH - Ohio'}, {name: 'OK - Oklahoma'}, {name: 'OR - Oregon'}, {name: 'PA - Pennsylvania'}, {name: 'PR - Puerto Rico'}, {name: 'RI - Rhode Island'}, {name: 'SC - South Carolina'}, {name: 'SD - South Dakota'}, {name: 'TN - Tennessee'}, {name: 'TX - Texas'}, {name: 'UT - Utah'}, {name: 'VA - Virginia'}, {name: 'VI - Virgin Islands'}, {name: 'VT - Vermont'}, {name: 'WA - Washington'}, {name: 'WI - Wisconsin'}, {name: 'WV - West Virginia'}, {name: 'WY - Wyoming'}];


const stateAbbr = {
    AK: 'Alaska',
    AL: 'Alabama',
    AR: 'Arkansas',
    AS: 'American Samoa',
    AZ: 'Arizona',
    CA: 'California',
    CO: 'Colorado',
    CT: 'Connecticut',
    DC: 'District of Columbia',
    DE: 'Delaware',
    FL: 'Florida',
    GA: 'Georgia',
    GU: 'Guam',
    HI: 'Hawaii',
    IA: 'Iowa',
    ID: 'Idaho',
    IL: 'Illinois',
    IN: 'Indiana',
    KS: 'Kansas',
    KY: 'Kentucky',
    LA: 'Louisiana',
    MA: 'Massachusetts',
    MD: 'Maryland',
    ME: 'Maine',
    MI: 'Michigan',
    MN: 'Minnesota',
    MO: 'Missouri',
    MS: 'Mississippi',
    MT: 'Montana',
    NC: 'North Carolina',
    ND: 'North Dakota',
    NE: 'Nebraska',
    NH: 'New Hampshire',
    NJ: 'New Jersey',
    NM: 'New Mexico',
    NV: 'Nevada',
    NY: 'New York',
    OH: 'Ohio',
    OK: 'Oklahoma',
    OR: 'Oregon',
    PA: 'Pennsylvania',
    PR: 'Puerto Rico',
    RI: 'Rhode Island',
    SC: 'South Carolina',
    SD: 'South Dakota',
    TN: 'Tennessee',
    TX: 'Texas',
    UT: 'Utah',
    VA: 'Virginia',
    VI: 'Virgin Islands',
    VT: 'Vermont',
    WA: 'Washington',
    WI: 'Wisconsin',
    WV: 'West Virginia',
    WY: 'Wyoming'
};

//endregion
export default function Page2() {

    //states
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');

    const [minAvgRatingForStay, setMinAvgRatingForStay] = useState(0);
    const [minAvgRatingForDo, setMinAvgRatingForDo] = useState(0);
    const [minAvgRatingForEat, setMinAvgRatingForEat] = useState(0);


    const [livingRate, setLivingRate] = useState(33.333333);
    const [entertainmentRate, setEntertainmentRate] = useState(33.333333);
    const eatingRate = 100 - livingRate - entertainmentRate;


    //state is one of init/state
    const [state, setState] = useState("init");
    const [stateListData, setStateListData] = useState([]);
    const [selectedState, setSelectedState] = useState([]);


    const [showCityList, setShowCityList] = useState(false);
    const [cityListData, setCityListData] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);


    const [showZipcode, setShowZipcode] = useState(false);
    const [zipcodeListData, setZipcodeListData] = useState([]);

    const [stateListId, setStateListId] = useState(() => uuid())
    const [cityListId, setCityListId] = useState(() => uuid())
    const [zipcodeListId, setZipcodeListId] = useState(() => uuid())


    // handlers
    function handleStateChange(e) {
        setShowCityList(false);
        setShowZipcode(false);
        setCityListId(uuid());
        setZipcodeListId(uuid());

        setSelectedState(e);
        if (e.length !== 0) {
            fetchRankCity(e).then(rsp => rsp.json()).then(rsp => {
                setCityListData(rsp)
                setShowCityList(true);

            }).catch(reason => {
                setShowCityList(false);
                alert("ERROR: fetch city rand fail: " + reason)
            });
        } else {
            setShowCityList(false);
        }
        setSelectedCity([]);
    }

    function handleCityChange(e) {

        setShowZipcode(false);
        setZipcodeListId(uuid());

        let city = null;

        if (selectedCity.length === 0) {
            setSelectedCity(e);
            city = e[0];
        } else if (selectedCity.length === 1) {
            if (e.length === 0) {
                setSelectedCity([]);
            } else {
                let copy = Array.from(e);
                copy = copy.filter(item => selectedCity.indexOf(item) === -1);
                setSelectedCity([copy[0]]);
                city = copy[0];
            }
        }


        fetchRankZipcode([city]).then(rsp => rsp.json()).then(rsp => {
            setShowZipcode(true);
            setZipcodeListData(rsp);
        }).catch(reason => {
            console.log(reason)
            setShowZipcode(false);
            alert("ERROR: fetch zipcode fil: " + reason)
        })
    }


    // ui fragments
    let stateList = null;

    let cityList = null;
    let zipcodeList = null;


    if (state === "init" || state === 'state') {
        const stateListColumn = [
            {
                field: 'name', headerName: 'State', width: 150, renderCell(e) {
                    const stateFullName = e.value.substring(e.value.indexOf('-') + 1).trim();

                    return (
                        <span><a className={'page2-table-link'} href={`https://en.wikipedia.org/wiki/${stateFullName}`}
                                 target={'_blank'}>{e.value}</a></span>)
                }
            },
            {field: 'score', headerName: 'Score', width: 50}]

        stateList = (<Grid item xs={4} key={stateListId}>
            <p>State Rank</p>
            <DataGrid
                rows={state === 'state' ? stateListData : allStates}
                columns={stateListColumn}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                autoHeight
                checkboxSelection
                disableSelectionOnClick
                getRowId={row => row.name.substring(0, row.name.indexOf('-')).trim()}
                selectionModel={selectedState}
                onSelectionModelChange={handleStateChange}
            />
        </Grid>);
    }


    if (showCityList) {
        const cityListColumn = [{field: 'name', headerName: 'City', width: 200}, {
            field: 'score', headerName: 'Score'
        }]

        cityList = (<Grid item xs={4} key={cityListId}>
            <p>City Rank</p>
            <DataGrid
                rows={cityListData}
                columns={cityListColumn}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                autoHeight
                checkboxSelection
                disableSelectionOnClick
                getRowId={row => row.name}
                selectionModel={selectedCity}
                onSelectionModelChange={handleCityChange}
            />
        </Grid>);

    }

    if (showZipcode) {
        const zipcodeListColumn = [{field: 'name', headerName: 'Zipcode', width: 200}, {
            field: 'score', headerName: 'Score'
        }]

        zipcodeList = (<Grid item xs={4} key={zipcodeListId}>
            <p>Zipcode Rank</p>
            <DataGrid
                rows={zipcodeListData}
                columns={zipcodeListColumn}
                pageSize={10}
                rowsPerPageOptions={[5, 10, 25]}
                autoHeight
                checkboxSelection
                disableSelectionOnClick
                getRowId={row => row.name}
                /*    selectionModel={selectedCity}
                    onSelectionModelChange={handleCityChange}*/
            />
        </Grid>);
    }


    function fetchRankCity(e) {
        const server = `http://${config.server_host}:${config.server_port}/rank/city`;
        const params = new URLSearchParams();
        params.append('host_weight', livingRate);
        params.append('do_weight', entertainmentRate);
        params.append('eat_weight', eatingRate);
        params.append('host_min', minAvgRatingForStay);
        params.append('do_min', minAvgRatingForDo);
        params.append('eat_min', minAvgRatingForEat)
        params.append('states', e.join(','))


        return fetch(`${server}?${params}`);
    }

    function fetchRankZipcode(cities) {
        const server = `http://${config.server_host}:${config.server_port}/rank/zipcode`;
        const params = new URLSearchParams();
        params.append('host_weight', livingRate);
        params.append('do_weight', entertainmentRate);
        params.append('eat_weight', eatingRate);
        params.append('host_min', minAvgRatingForStay);
        params.append('do_min', minAvgRatingForDo);
        params.append('eat_min', minAvgRatingForEat)
        params.append('cities', cities.join(","));
        return fetch(`${server}?${params}`);
    }

    const handleSearchButton = () => {
        setShowCityList(false);
        setShowZipcode(false);
        setStateListId(uuid());
        setCityListId(uuid());
        setZipcodeListId(uuid());

        setSelectedState([]);
        setSelectedCity([]);


        const server = `http://${config.server_host}:${config.server_port}/rank/state`;
        const params = new URLSearchParams();
        params.append('host_weight', livingRate);
        params.append('do_weight', entertainmentRate);
        params.append('eat_weight', eatingRate);
        params.append('host_min', minAvgRatingForStay);
        params.append('do_min', minAvgRatingForDo);
        params.append('eat_min', minAvgRatingForEat)

        fetch(`${server}?${params}`).then(rsp => rsp.json()).then(rsp => {

            for (let item of rsp) {
                const fullName = stateAbbr[item.name];
                item['name'] = `${item.name} - ${fullName}`;
            }

            setStateListData(rsp);
            setState('state')
        }).catch(reason => {
            setState('init')
            alert("ERROR: " + reason)
        });

    }

    function handleResetButton() {
        setEntertainmentRate(33.333333);
        setLivingRate(33.333333)
        setShowCityList(false);
        setShowZipcode(false);
        setStateListId(uuid());
        setCityListId(uuid());
        setZipcodeListId(uuid());
        setSelectedState([]);
        setSelectedCity([]);
        setMinAvgRatingForStay(0);
        setMinAvgRatingForDo(0);
        setMinAvgRatingForEat(0);
    }


    // This defines the columns of the table of songs used by the DataGrid component.
    // The format of the columns array and the DataGrid component itself is very similar to our
    // LazyTable component. The big difference is we provide all data to the DataGrid component
    // instead of loading only the data we need (which is necessary in order to be able to sort by column)
    const columns = [{
        field: 'bussiness', headerName: 'State', width: 200, // renderCell: (params) => (
        //     <Link onClick={() => setSelectedSongId(params.row.song_id)}>{params.value}</Link>
        // )
    }, {field: 'category', headerName: 'Category'}]

    return (<Container>


        {/* {selectedSongId && <SongCard songId={selectedSongId} handleClose={() => setSelectedSongId(null)} />} */}
        <h2>Search Recommendation</h2>

        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Container sx={{pl: {xs: 0}}} className={'xxx'}>LIVING/ENTERTAINMENT/EATING RATE</Container>
                <Container sx={{
                    pl: {xs: 0}
                }}>
                    <NoUISlider entertainmentRate={entertainmentRate} livingRate={livingRate} onChange={e => {
                        console.log(e)
                        setEntertainmentRate(e.entertainmentRate);
                        setLivingRate(e.livingRate);
                    }}></NoUISlider>
                </Container>
            </Grid>


            <Grid item xs={3}>
                <TextField label='Minimum Avarage Rating For Stay' value={minAvgRatingForStay}
                           onChange={(e) => setMinAvgRatingForStay(e.target.value)}
                           style={{width: "100%"}} type={'number'}/>
            </Grid>
            <Grid item xs={3}>
                <TextField label='Minimum Avarage Rating For Do' value={minAvgRatingForDo} type={'number'}
                           onChange={(e) => setMinAvgRatingForDo(e.target.value)} style={{width: "100%"}}/>
            </Grid>

            <Grid item xs={3}>
                <TextField label='Minimum Avarage Rating For Eat' value={minAvgRatingForEat} type={'number'}
                           onChange={(e) => setMinAvgRatingForEat(e.target.value)} style={{width: "100%"}}/>
            </Grid>

            <Grid item xs={3}>
                <Container sx={{
                    display: 'flex', justifyContent: 'end', height: '100%'
                }}>
                    <Button onClick={handleResetButton} color="warning">
                        Reset
                    </Button>
                    <Button onClick={() => handleSearchButton()} color="primary">
                        Search
                    </Button>
                </Container>
            </Grid>


        </Grid>

        <h2>Results</h2>
        <Grid container spacing={1}>
            {stateList}
            {cityList}
            {zipcodeList}
        </Grid>

    </Container>);
}
