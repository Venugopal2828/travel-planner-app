import React, { useState, useEffect } from 'react';
import { Plane, Train, Bus, Car, ArrowLeftRight } from 'lucide-react';
import { useCart } from './CartContext';

const FlightSearch = () => {
    const [cart, setCart] = useState([]);
    const [activeNav, setActiveNav] = useState('flights');
    const [formContent, setFormContent] = useState('flights');
    const [tripType, setTripType] = useState('roundTrip');
    const [fromCity, setFromCity] = useState('');
    const [toCity, setToCity] = useState('');
    const [showFromList, setShowFromList] = useState(false);
    const [showToList, setShowToList] = useState(false);
    const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);
    const [showReturnCalendar, setShowReturnCalendar] = useState(false);
    const [departureDate, setDepartureDate] = useState(new Date());
    const [returnDate, setReturnDate] = useState(new Date());
    const [searchResults, setSearchResults] = useState([]); // Store search results

    const navigationItems = [
        { id: 'flight', icon: <Plane />, text: 'Flights', form: 'flightForm' },
        { id: 'train', icon: <Train />, text: 'Trains', form: 'trainForm' },
        { id: 'bus', icon: <Bus />, text: 'Buses', form: 'busForm' },
        { id: 'cab', icon: <Car />, text: 'Cabs', form: 'cabForm' },
    ];

    const citiesByState = {
        'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
        'Delhi': ['New Delhi', 'Delhi'],
        'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli'],
        'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
        'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
    };
    const { addToCart } = useCart();
    const handleNavClick = (navId) => {
        setActiveNav(navId);
        setFromCity('');
        setToCity('');
        setDepartureDate(new Date());
        setReturnDate(new Date());
    };
    const handleAddToCart = (item) => {
        const exists = cart.some(cartItem => cartItem.id === item.id);
        if (!exists) {
            setCart(prevCart => {
                const newCart = [...prevCart, item];
                console.log(newCart);  // Log cart state to see if it's updating
                addToCart(item);
                return newCart;
            });
        } else {
            alert("Item already in the cart!");
        }
    };

    const handleSearch = () => {
        const results = [
            {
                id: 1,
                name: activeNav,
                from: fromCity,
                to: toCity,
                tripType: tripType,
                departureDate: departureDate.toLocaleDateString(),
                returnDate: tripType === 'roundTrip' ? returnDate.toLocaleDateString() : '',
                price: Math.floor(Math.random() * 5000) + 1000, // Random price between 100 and 600
                image: activeNav === 'flight' ? 'https://cdn.prod.website-files.com/642532eebf0ae34ecb684133/65ae83c3206dbe9250e0aaca_Indigo-hero.webp' : activeNav === 'train' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMSC9E6Pi54WGmLwxPJ5lTJUDiUgMQAqhl6w&s' : activeNav === 'bus' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiGQbZyrNjUBPuhcKol9Dxq_JJT-9Q6RUUdA&s' : 'https://1000logos.net/wp-content/uploads/2022/08/Ola-Cabs-Logo.jpg',
            },
            {
                id: 2,
                name: activeNav,
                from: fromCity,
                to: toCity,
                tripType: tripType,
                departureDate: departureDate.toLocaleDateString(),
                returnDate: tripType === 'roundTrip' ? returnDate.toLocaleDateString() : '',
                price: Math.floor(Math.random() * 5000) + 1000,
                image: activeNav === 'flight' ? 'https://beebom.com/wp-content/uploads/2015/02/airline-logos-airasia-e1424575285622.jpg?w=400&quality=75' : activeNav === 'train' ? 'https://www.shutterstock.com/image-vector/new-train-india-vande-bharat-260nw-2294127767.jpg' : activeNav === 'bus' ? 'https://t3.ftcdn.net/jpg/04/58/91/72/360_F_458917202_dy4BoS1OpHDEqTugPEWvEx2ycyoc02y3.jpg' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_9y0Mxa_XLsD81jizhYfy3aMAYaAhT9_rGQ&s',
            },
            {
                id: 3,
                name: activeNav,
                from: fromCity,
                to: toCity,
                tripType: tripType,
                departureDate: departureDate.toLocaleDateString(),
                returnDate: tripType === 'roundTrip' ? returnDate.toLocaleDateString() : '',
                price: Math.floor(Math.random() * 5000) + 1000,
                image: activeNav === 'flight' ? 'https://bcassetcdn.com/public/blog/wp-content/uploads/2022/08/25102503/Delta-Airlines-Logo.png' : activeNav === 'train' ? 'https://tams.indianrailways.gov.in/TAMSStatic/TAMSStatic/logo.jpg' : activeNav === 'bus' ? 'https://pbs.twimg.com/profile_images/618754908083220480/Rhsl9EoU_400x400.jpg' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfMPZMBj9VsjirOOQMvP1qT8qUqXW07D9XDA&s',
            },
            {
                id: 4,
                name: activeNav,
                from: fromCity,
                to: toCity,
                tripType: tripType,
                departureDate: departureDate.toLocaleDateString(),
                returnDate: tripType === 'roundTrip' ? returnDate.toLocaleDateString() : '',
                price: Math.floor(Math.random() * 5000) + 1000,
                image: activeNav === 'flight' ? 'https://media.assettype.com/creativegaga%2F2023-08%2F7605006c-4e86-45ed-a5cd-cb00cbb32461%2FAirIndia_NewLogo.webp' : activeNav === 'train' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/The_logo_of_Northeast_Frontier_Railway_%28cropped%29.jpg/800px-The_logo_of_Northeast_Frontier_Railway_%28cropped%29.jpg' : activeNav === 'bus' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkOt62jL_2rqVsDnZeBOyTUEydv6W0Uyi63g&s' : 'https://img.freepik.com/premium-vector/cab-logo_773550-247.jpg',
            },
            {
                id: 5,
                name: activeNav,
                from: fromCity,
                to: toCity,
                tripType: tripType,
                departureDate: departureDate.toLocaleDateString(),
                returnDate: tripType === 'roundTrip' ? returnDate.toLocaleDateString() : '',
                price: Math.floor(Math.random() * 5000) + 1000,
                image: activeNav === 'flight' ? 'https://img.theweek.in/content/dam/week/news/biz-tech/images/2019/11/24/Lufthansa-logo.jpg' : activeNav === 'train' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNZvILQh518rfDO6T1dubu0aXd2ya1cMig6w&s' : activeNav === 'bus' ? 'https://media.licdn.com/dms/image/v2/C5112AQGqW6YvbSb67A/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520044200487?e=2147483647&v=beta&t=Zoupkit_K4FD3tVGklQANS9ahL-Eyq3KrlD4k0f0Djw' : 'https://imgs.search.brave.com/JwSG7lk9cdDI-G5BDua68t8BrrrD2qj8k32wyGD0nLo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9paDEu/cmVkYnViYmxlLm5l/dC9pbWFnZS4yMTA2/MTMxODQxLjM1MjMv/YmcsZjhmOGY4LWZs/YXQsNzUweCwwNzUs/Zi1wYWQsNzUweDEw/MDAsZjhmOGY4LnUx/LmpwZw',
            },
        ];
        setSearchResults(results);
    
    };
    useEffect(() => {
        console.log("Cart updated: ", cart);
    }, [cart]);

    const renderForm = () => {
        switch (formContent) {
            case 'flights':
                return (
                    <div>
                        <div className='formcontainer' style={styles.formcontainer}>
                            <div style={styles.tripType}>
                                <label style={styles.tripTypeLabel}>
                                    <input
                                        type="radio"
                                        name="tripType"
                                        value="oneWay"
                                        checked={tripType === 'oneWay'}
                                        onChange={(e) => setTripType(e.target.value)}
                                    />
                                    One Way
                                </label>
                                <label style={styles.tripTypeLabel}>
                                    <input
                                        type="radio"
                                        name="tripType"
                                        value="roundTrip"
                                        checked={tripType === 'roundTrip'}
                                        onChange={(e) => setTripType(e.target.value)}
                                    />
                                    Round Trip
                                </label>
                                <label style={styles.tripTypeLabel}>
                                    <input
                                        type="radio"
                                        name="tripType"
                                        value="multiCity"
                                        checked={tripType === 'multiCity'}
                                        onChange={(e) => setTripType(e.target.value)}
                                    />
                                    Multi City
                                </label>
                            </div>

                            <div style={styles.searchForm}>
                                <div style={{ position: 'relative' }}>
                                    <label style={styles.label}>From</label>
                                    <div
                                        style={styles.inputContainer}
                                        onClick={() => setShowFromList(true)}
                                    >
                                        <span style={styles.city}>{fromCity || 'Select City'}</span>
                                    </div>
                                    {showFromList && (
                                        <div style={styles.cityList}>
                                            {Object.entries(citiesByState).map(([state, cities]) => (
                                                <div key={state}>
                                                    <div style={styles.stateHeader}>{state}</div>
                                                    {cities.map((city) => (
                                                        <div
                                                            key={city}
                                                            style={styles.cityOption}
                                                            onClick={() => {
                                                                setFromCity(city);
                                                                setShowFromList(false);
                                                            }}
                                                        >
                                                            {city}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div style={styles.swapIcon}>
                                    <ArrowLeftRight />
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <label style={styles.label}>To</label>
                                    <div
                                        style={styles.inputContainer}
                                        onClick={() => setShowToList(true)}
                                    >
                                        <span style={styles.city}>{toCity || 'Select City'}</span>
                                    </div>
                                    {showToList && (
                                        <div style={styles.cityList}>
                                            {Object.entries(citiesByState).map(([state, cities]) => (
                                                <div key={state}>
                                                    <div style={styles.stateHeader}>{state}</div>
                                                    {cities.map((city) => (
                                                        <div
                                                            key={city}
                                                            style={styles.cityOption}
                                                            onClick={() => {
                                                                setToCity(city);
                                                                setShowToList(false);
                                                            }}
                                                        >
                                                            {city}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <label style={styles.label}>Departure</label>
                                    <div
                                        style={styles.inputContainer}
                                        onClick={() => setShowDepartureCalendar(true)}
                                    >
                                        <div style={styles.date}>
                                            <span style={styles.day}>{departureDate.toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    {showDepartureCalendar && (
                                        <div style={styles.calendar}>
                                            <input
                                                type="date"
                                                value={departureDate.toISOString().split('T')[0]}
                                                onChange={(e) => {
                                                    setDepartureDate(new Date(e.target.value));
                                                    setShowDepartureCalendar(false);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div style={{ position: 'relative' }}>
                                    <label style={styles.label}>Return</label>
                                    <div
                                        style={styles.inputContainer}
                                        onClick={() => setShowReturnCalendar(true)}
                                    >
                                        <div style={styles.date}>
                                            <span style={styles.day}>{returnDate.toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    {showReturnCalendar && (
                                        <div style={styles.calendar}>
                                            <input
                                                type="date"
                                                value={returnDate.toISOString().split('T')[0]}
                                                onChange={(e) => {
                                                    setReturnDate(new Date(e.target.value));
                                                    setShowReturnCalendar(false);
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                style={styles.searchButton}
                                onClick={handleSearch} // Handle the click
                            >
                                SEARCH
                            </button>
                        </div>

                        {/* Render the cards after search */}
                        <div style={styles.cardsContainer}>
                            {searchResults.map((result) => (
                                <div key={result.id} style={styles.card}>
                                    <img src={result.image} alt={result.name} style={styles.cardImage} />
                                    <div style={styles.cardContent}>
                                        <h3>{result.name.toUpperCase()}</h3>
                                        <p>
                                            From: {result.from} <br />
                                            To: {result.to} <br />
                                            {result.tripType === 'roundTrip' ? `Return: ${result.returnDate}` : ''}
                                        </p>
                                        <div style={styles.price}>₹{result.price}</div>
                                        <button
                                            style={styles.cartButton}
                                            onClick={() => handleAddToCart(result)}
                                        >
                                            Add to Cart
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const styles = {


        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            overflowY: 'auto',
            height: '98vh',
        },
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '32px'
        },
        navButton: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '8px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: '#666'
        },
        activeNav: {
            color: '#1a73e8'
        },
        searchForm: {
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr 1fr 1fr',
            gap: '16px',
            marginBottom: '24px'
        },
        inputContainer: {
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '8px',
            cursor: 'pointer'
        },
        cityList: {
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            zIndex: 1000
        },
        cityOption: {
            padding: '8px',
            cursor: 'pointer'
        },
        stateHeader: {
            padding: '8px',
            fontWeight: 'bold',
            background: '#f0f0f0'
        },
        calendar: {
            position: 'absolute',
            top: '100%',
            left: 0,
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '16px',
            zIndex: 1000
        },
        tripType: {
            display: 'flex',
            gap: '16px',
            marginBottom: '16px'
        },
        tripTypeLabel: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
        },
        fareSection: {
            marginBottom: '24px'
        },
        fareTitle: {
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '8px'
        },
        fareTypes: {
            display: 'flex',
            gap: '16px'
        },
        fareOption: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '12px',
            cursor: 'pointer'
        },
        fareSelected: {
            borderColor: '#1a73e8',
            backgroundColor: '#f0f7ff'
        },
        searchButton: {
            width: '100%',
            backgroundColor: '#1a73e8',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontWeight: '600',
            cursor: 'pointer'
        },
        cardsContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginTop: '20px',
        },
        card: {
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            width: '250px',
            margin: '10px',
            transition: 'transform 0.3s ease',
        },
        cardImage: {
            width: '100%',
            height: '150px',
            objectFit: 'cover',
        },
        cardContent: {
            padding: '16px',
        },
        price: {
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#28a745',
        },
        cartButton: {
            background: '#1a73e8',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.nav}>
                {navigationItems.map((item) => (
                    <button
                        key={item.id}
                        style={{
                            ...styles.navButton,
                            ...(activeNav === item.id && styles.activeNav),
                        }}
                        onClick={() => handleNavClick(item.id)}
                    >
                        {item.icon}
                        {item.text}
                    </button>
                ))}
            </div>

            {renderForm()}
        </div>
    );
};

export default FlightSearch;