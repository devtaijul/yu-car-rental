import { BookingWithAll } from "@/types/system";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatDate } from "../formatDate";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  section: { marginBottom: 10 },
  title: { fontSize: 18, marginBottom: 20 },
});

export const ContractDocument = ({ booking }: { booking: BookingWithAll }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Rental Agreement</Text>

      <View style={styles.section}>
        <Text>Booking ID: {booking.id}</Text>
        <Text>Name: {booking.user?.firstName}</Text>
        <Text>Email: {booking.user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text>Car: {booking.car.model}</Text>
        <Text>Pickup: {formatDate(booking.startDate)}</Text>
        <Text>Return: {formatDate(booking.endDate)}</Text>
      </View>

      <View style={styles.section}>
        <Text>Total Price: ${booking.totalAmount}</Text>
      </View>
    </Page>
  </Document>
);
