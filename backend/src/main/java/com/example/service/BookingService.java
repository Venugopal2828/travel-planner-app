package com.example.service;

import com.example.dto.*;
import com.example.entity.*;
import com.example.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final BusRepository busBookingRepository;
    private final CabRepository cabBookingRepository;
    private final TrainRepository trainBookingRepository;
    private final FlightRepository flightBookingRepository;
    private final HotelRepository hotelBookingRepository;

    public BookingService(
            BookingRepository bookingRepository,
            BusRepository busBookingRepository,
            CabRepository cabBookingRepository,
            TrainRepository trainBookingRepository,
            FlightRepository flightBookingRepository,
            HotelRepository hotelBookingRepository) {
        this.bookingRepository = bookingRepository;
        this.busBookingRepository = busBookingRepository;
        this.cabBookingRepository = cabBookingRepository;
        this.trainBookingRepository = trainBookingRepository;
        this.flightBookingRepository = flightBookingRepository;
        this.hotelBookingRepository = hotelBookingRepository;
    }

    @Transactional
    public Booking createBusBooking(BusBookingRequest request, User user) {
        Bus busBooking = new Bus();
        busBooking.setFromCity(request.getFromCity());
        busBooking.setToCity(request.getToCity());
        busBooking.setDepartureDate(request.getDepartureDate());
        busBooking.setReturnDate(request.getReturnDate());
        busBooking.setBusName(request.getBusName());
        busBooking.setNumberOfPersons(request.getNumberOfPersons());
        busBooking.setTripType(request.getTripType());
        busBooking.setPrice(request.getPrice());
        busBooking.setPaymentStatus(request.getPaymentStatus() != null ? request.getPaymentStatus() : "Pending");
        busBookingRepository.save(busBooking);

        return saveBooking(busBooking, "bus", request.getPaymentStatus(), user);
    }

    @Transactional
    public Booking createCabBooking(CabBookingRequest request, User user) {
        Cab cabBooking = new Cab();
        cabBooking.setFromCity(request.getFromCity());
        cabBooking.setToCity(request.getToCity());
        cabBooking.setDepartureDate(request.getDepartureDate());
        cabBooking.setReturnDate(request.getReturnDate());
        cabBooking.setCabName(request.getCabName());
        cabBooking.setNumberOfPersons(request.getNumberOfPersons());
        cabBooking.setTripType(request.getTripType());
        cabBooking.setPrice(request.getPrice());
        cabBooking.setPaymentStatus(request.getPaymentStatus() != null ? request.getPaymentStatus() : "Pending");
        cabBookingRepository.save(cabBooking);

        return saveBooking(cabBooking, "cab", "Pending", user);
    }

    @Transactional
    public Booking createTrainBooking(TrainBookingRequest request, User user) {
        Train trainBooking = new Train();
        trainBooking.setFromCity(request.getFromCity());
        trainBooking.setToCity(request.getToCity());
        trainBooking.setDepartureDate(request.getDepartureDate());
        trainBooking.setReturnDate(request.getReturnDate());
        trainBooking.setTrainName(request.getTrainName());
        trainBooking.setNumberOfPersons(request.getNumberOfPersons());
        trainBooking.setTripType(request.getTripType());
        trainBooking.setPrice(request.getPrice());
        trainBooking.setPaymentStatus(request.getPaymentStatus() != null ? request.getPaymentStatus() : "Pending");
        trainBookingRepository.save(trainBooking);

        return saveBooking(trainBooking, "train", "Pending", user);
    }

    @Transactional
    public Booking createFlightBooking(FlightBookingRequest request, User user) {
        Flight flightBooking = new Flight();
        flightBooking.setFromCity(request.getFromCity());
        flightBooking.setToCity(request.getToCity());
        flightBooking.setDepartureDate(request.getDepartureDate());
        flightBooking.setReturnDate(request.getReturnDate());
        flightBooking.setFlightName(request.getFlightName());
        flightBooking.setNumberOfPersons(request.getNumberOfPersons());
        flightBooking.setTripType(request.getTripType());
        flightBooking.setPrice(request.getPrice());
        flightBooking.setPaymentStatus(request.getPaymentStatus() != null ? request.getPaymentStatus() : "Pending");
        flightBookingRepository.save(flightBooking);

        return saveBooking(flightBooking, "flight", "Pending", user);
    }

    @Transactional
    public Booking createHotelBooking(HotelBookingRequest request, User user) {
        Hotel hotelBooking = new Hotel();
        hotelBooking.setHotelName(request.getHotelName());
        hotelBooking.setLocation(request.getLocation());
        hotelBooking.setGuests(request.getGuests());
        hotelBooking.setCheckInDate(request.getCheckInDate().toString());
        hotelBooking.setCheckOutDate(request.getCheckOutDate().toString());
        hotelBooking.setPrice(request.getPrice());
        hotelBooking.setAmount(request.getAmount());
        hotelBooking.setPaymentStatus(request.getPaymentStatus() != null ? request.getPaymentStatus() : "Pending");
        hotelBooking.setToCity("HotelCity");
        hotelBooking.setTripType("HotelTrip");
        hotelBookingRepository.save(hotelBooking);

        return saveBooking(hotelBooking, "hotel", hotelBooking.getPaymentStatus(), user);
    }

    public Optional<Booking> getBooking(Long id) {
        return bookingRepository.findById(id);
    }

    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUser_Id(userId);
    }

    private Booking saveBooking(Object bookingEntity, String bookingType, String paymentStatus, User user) {
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setBookingType(bookingType);
        booking.setFromCity(getEntityField(bookingEntity, "fromCity"));
        booking.setToCity(getEntityField(bookingEntity, "toCity"));
        booking.setDepartureDate(getEntityField(bookingEntity, "departureDate"));
        booking.setReturnDate(getEntityField(bookingEntity, "returnDate"));
        booking.setTripType(getEntityField(bookingEntity, "tripType"));

        // Set name, price, and tripType based on booking type
        if (bookingEntity instanceof Hotel) {
            booking.setName(((Hotel) bookingEntity).getHotelName());
            booking.setFromCity(((Hotel) bookingEntity).getLocation());
            booking.setDepartureDate(((Hotel) bookingEntity).getCheckInDate());
            booking.setReturnDate(((Hotel) bookingEntity).getCheckOutDate());
            booking.setNumberOfPersons(((Hotel) bookingEntity).getGuests());
            booking.setPrice(((Hotel) bookingEntity).getPrice());
        } else if (bookingEntity instanceof Bus) {
            booking.setName(((Bus) bookingEntity).getBusName());
            booking.setNumberOfPersons(((Bus) bookingEntity).getNumberOfPersons());
            booking.setPrice(((Bus) bookingEntity).getPrice());
        } else if (bookingEntity instanceof Cab) {
            booking.setName(((Cab) bookingEntity).getCabName());
            booking.setNumberOfPersons(((Cab) bookingEntity).getNumberOfPersons());
            booking.setPrice(((Cab) bookingEntity).getPrice());
        } else if (bookingEntity instanceof Train) {
            booking.setName(((Train) bookingEntity).getTrainName());
            booking.setNumberOfPersons(((Train) bookingEntity).getNumberOfPersons());
            booking.setPrice(((Train) bookingEntity).getPrice());
        } else if (bookingEntity instanceof Flight) {
            booking.setName(((Flight) bookingEntity).getFlightName());
            booking.setNumberOfPersons(((Flight) bookingEntity).getNumberOfPersons());
            booking.setPrice(((Flight) bookingEntity).getPrice());
        }

        booking.setPaymentStatus(paymentStatus);

        return bookingRepository.save(booking);
    }

    private String getEntityField(Object entity, String fieldName) {
        try {
            return (String) entity.getClass().getMethod("get" + capitalize(fieldName)).invoke(entity);
        } catch (Exception e) {
            return null;
        }
    }

    private String capitalize(String str) {
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
}
