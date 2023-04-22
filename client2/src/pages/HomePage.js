import {useEffect, useState} from 'react';
import {
    Button, Checkbox, Container, FormControlLabel, Grid, Link,
    Slider, TextField, Select, FormControl, InputLabel, MenuItem
} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';

const config = require('../config.json');

export default function MainPage() {
    const allStates = ["AK - Alaska",
        "AL - Alabama",
        "AR - Arkansas",
        "AS - American Samoa",
        "AZ - Arizona",
        "CA - California",
        "CO - Colorado",
        "CT - Connecticut",
        "DC - District of Columbia",
        "DE - Delaware",
        "FL - Florida",
        "GA - Georgia",
        "GU - Guam",
        "HI - Hawaii",
        "IA - Iowa",
        "ID - Idaho",
        "IL - Illinois",
        "IN - Indiana",
        "KS - Kansas",
        "KY - Kentucky",
        "LA - Louisiana",
        "MA - Massachusetts",
        "MD - Maryland",
        "ME - Maine",
        "MI - Michigan",
        "MN - Minnesota",
        "MO - Missouri",
        "MS - Mississippi",
        "MT - Montana",
        "NC - North Carolina",
        "ND - North Dakota",
        "NE - Nebraska",
        "NH - New Hampshire",
        "NJ - New Jersey",
        "NM - New Mexico",
        "NV - Nevada",
        "NY - New York",
        "OH - Ohio",
        "OK - Oklahoma",
        "OR - Oregon",
        "PA - Pennsylvania",
        "PR - Puerto Rico",
        "RI - Rhode Island",
        "SC - South Carolina",
        "SD - South Dakota",
        "TN - Tennessee",
        "TX - Texas",
        "UT - Utah",
        "VA - Virginia",
        "VI - Virgin Islands",
        "VT - Vermont",
        "WA - Washington",
        "WI - Wisconsin",
        "WV - West Virginia",
        "WY - Wyoming"]
    const [stayPageSize, setStayPageSize] = useState(10);
    const [stayData, setStayData] = useState([{id: 1, bussiness: "try", category: "hotel"}]);
    const [selectedStayId, setSelectedStayId] = useState(null);

    const [doPageSize, setDoPageSize] = useState(10);
    const [doData, setDoData] = useState([]);
    const [selectedDoId, setSelectedDoId] = useState(null);

    const [eatPageSize, setEatPageSize] = useState(10);
    const [eatData, setEatData] = useState([]);
    const [selectedEatId, setSelectedEatId] = useState(null);

    const [stateId, setStateId] = useState(null);
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState(null);

    const [minAvgRatingForStay, setMinAvgRatingForStay] = useState(null);
    const [minAvgRatingForDo, setMinAvgRatingForDo] = useState(null);
    const [minAvgRatingForEat, setMinAvgRatingForEat] = useState(null);

    const [useStateId, setUseStateId] = useState(false);
    const [useCity, setUseCity] = useState(false);
    const [useZipcode, setUseZipcode] = useState(false);

    const [showStay, setShowStay] = useState(true);
    const [showDo, setShowDo] = useState(true);
    const [showEat, setShowEat] = useState(true);


    useEffect(() => {
        // replace later
        // fetch(`http://${config.server_host}:${config.server_port}/search_songs`)
        //   .then(res => res.json())
        //   .then(resJson => {
        //     const songsWithId = resJson.map((song) => ({ id: song.song_id, ...song }));
        //     setData(songsWithId);
        //   });
    }, []);

    const search = () => {


        /**
         * fetch rank of state/city/zipcode
         * @param type
         */
        function fetchRank(type) {
            const server = `http://${config.server_host}:${config.server_port}/rank/${type}`;
            const params = new URLSearchParams();
        }


        // fetch stay

        // fetch do

        // fetch eat


    }

    // This defines the columns of the table of songs used by the DataGrid component.
    // The format of the columns array and the DataGrid component itself is very similar to our
    // LazyTable component. The big difference is we provide all data to the DataGrid component
    // instead of loading only the data we need (which is necessary in order to be able to sort by column)
    const columns = [
        {
            field: 'bussiness', headerName: 'Bussiness', width: 200,
            // renderCell: (params) => (
            //     <Link onClick={() => setSelectedSongId(params.row.song_id)}>{params.value}</Link>
            // )
        },
        {field: 'category', headerName: 'Category'}
    ]

    return (
        <Container>
            {/* {selectedSongId && <SongCard songId={selectedSongId} handleClose={() => setSelectedSongId(null)} />} */}
            <h2>Search Recommendation</h2>
            <Grid container spacing={6}>
                <Grid item xs={4}>
                    <FormControlLabel
                        label='Search By State'
                        control={<Checkbox checked={useStateId} onChange={(e) => {
                            setUseStateId(e.target.checked);
                            setUseCity(false);
                            setUseZipcode(false);
                        }}/>}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                        label='Search By City'
                        control={<Checkbox checked={useCity} onChange={(e) => {
                            setUseStateId(false);
                            setUseCity(e.target.checked);
                            setUseZipcode(false);
                        }}/>}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                        label='Search By Zipcode'
                        control={<Checkbox checked={useZipcode} onChange={(e) => {
                            setUseStateId(false);
                            setUseCity(false);
                            setUseZipcode(e.target.checked);
                        }}/>}
                    />
                </Grid>
                {useStateId &&
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="state-select-label">State</InputLabel>
                            <Select
                                labelId="state-select-label"
                                id="state-select"
                                value={stateId}
                                label="State"
                                onChange={(e) => setStateId(e.target.value)}>
                                {allStates.map((value) => (
                                    <MenuItem value={value}>{value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>}

                {useCity &&
                    <Grid item xs={12}>
                        <TextField label='City' value={city} onChange={(e) => setCity(e.target.value)}
                                   style={{width: "100%"}}/>
                    </Grid>}

                {useZipcode &&
                    <Grid item xs={12}>
                        <TextField label='Zipcode' value={zipcode} onChange={(e) => setZipcode(e.target.value)}
                                   style={{width: "100%"}}/>
                    </Grid>}

                {(useStateId || useCity || useZipcode) &&
                    <Grid item xs={4}>
                        <TextField label='Minimum Avarage Rating For Stay' value={minAvgRatingForStay}
                                   onChange={(e) => setMinAvgRatingForStay(e.target.value)} style={{width: "100%"}}/>
                    </Grid>}
                {(useStateId || useCity || useZipcode) &&
                    <Grid item xs={4}>
                        <TextField label='Minimum Avarage Rating For Do' value={minAvgRatingForDo}
                                   onChange={(e) => setMinAvgRatingForDo(e.target.value)} style={{width: "100%"}}/>
                    </Grid>}
                {(useStateId || useCity || useZipcode) &&
                    <Grid item xs={4}>
                        <TextField label='Minimum Avarage Rating For Eat' value={minAvgRatingForEat}
                                   onChange={(e) => setMinAvgRatingForEat(e.target.value)} style={{width: "100%"}}/>
                    </Grid>}
            </Grid>
            {(useStateId || useCity || useZipcode) &&
                <Button onClick={() => search()} style={{left: '50%', transform: 'translateX(-50%)'}}>
                    Search
                </Button>}
            <h2>Results</h2>
            {/* Notice how similar the DataGrid component is to our LazyTable! What are the differences? */}
            <Grid container spacing={6}>
                <Grid item xs={4}>
                    <FormControlLabel
                        label='Show stay recommendation'
                        control={<Checkbox checked={showStay} onChange={(e) => setShowStay(e.target.checked)}/>}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                        label='Show do recommendation'
                        control={<Checkbox checked={showDo} onChange={(e) => setShowDo(e.target.checked)}/>}
                    />
                </Grid>
                <Grid item xs={4}>
                    <FormControlLabel
                        label='Show eat recommendation'
                        control={<Checkbox checked={showEat} onChange={(e) => setShowEat(e.target.checked)}/>}
                    />
                </Grid>
                <Grid item xs={4}>
                    {showStay &&
                        <p>Stay Recommendation</p>}
                    {showStay &&
                        <DataGrid
                            rows={stayData}
                            columns={columns}
                            pageSize={stayPageSize}
                            rowsPerPageOptions={[5, 10, 25]}
                            onPageSizeChange={(newPageSize) => setStayPageSize(newPageSize)}
                            autoHeight
                            checkboxSelection
                            onSelectionChange={e => console.log(e.rows)}
                        />}
                </Grid>
                <Grid item xs={4}>
                    {showDo &&
                        <p>Do Recommendation</p>}
                    {showDo &&
                        <DataGrid
                            rows={doData}
                            columns={columns}
                            pageSize={doPageSize}
                            rowsPerPageOptions={[5, 10, 25]}
                            onPageSizeChange={(newPageSize) => setDoPageSize(newPageSize)}
                            autoHeight
                            checkboxSelection
                            onSelectionChange={e => console.log(e.rows)}
                        />}
                </Grid>
                <Grid item xs={4}>
                    {showEat &&
                        <p>Eat Recommendation</p>}
                    {showEat &&
                        <DataGrid
                            rows={eatData}
                            columns={columns}
                            pageSize={eatPageSize}
                            rowsPerPageOptions={[5, 10, 25]}
                            onPageSizeChange={(newPageSize) => setEatPageSize(newPageSize)}
                            autoHeight
                            checkboxSelection
                            onSelectionChange={e => console.log(e.rows)}
                        />}
                </Grid>
            </Grid>
        </Container>
    );
}
