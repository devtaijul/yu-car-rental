import { PaymentWithAll } from "@/types/system";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  logo: {
    width: 120,
  },

  invoiceTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  sectionTitle: {
    fontSize: 13,
    marginBottom: 6,
    fontWeight: "bold",
  },

  table: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#e5e5e5",
  },

  tableRow: {
    flexDirection: "row",
  },

  tableHeader: {
    backgroundColor: "#f3f4f6",
  },

  cell: {
    padding: 8,
    flex: 1,
    borderRightWidth: 1,
    borderColor: "#e5e5e5",
  },

  lastCell: {
    borderRightWidth: 0,
  },

  totalSection: {
    marginTop: 20,
    alignItems: "flex-end",
  },

  paidBadge: {
    marginTop: 15,
    color: "green",
    fontSize: 14,
    fontWeight: "bold",
  },

  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    textAlign: "center",
    color: "gray",
  },
});

export function CarRentalInvoice({ payment }: { payment: PaymentWithAll }) {
  const {
    id,
    amount,
    currency,
    status,
    stripePaymentIntentId,
    createdAt,
    user,
  } = payment;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Image
              style={styles.logo}
              src="https://dummyimage.com/300x80/000/fff&text=123+Car+Rental"
            />
            <Text>123 Car Rental LLC</Text>
            <Text>Kralendijk, Bonaire</Text>
            <Text>Email: info@123carrental.com</Text>
          </View>

          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text>Invoice ID: {id.slice(0, 8)}</Text>
            <Text>Date: {new Date(createdAt).toLocaleDateString()}</Text>
            <Text>Status: {status}</Text>
          </View>
        </View>

        {/* BILL TO */}
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.sectionTitle}>Bill To</Text>
          <Text>
            {user.firstName} {user.lastName}
          </Text>
          <Text>{user.email}</Text>
          <Text>
            {user.phoneCode} {user.phone}
          </Text>
          <Text>License: {user.licenseNumber}</Text>
        </View>

        {/* PAYMENT DETAILS TABLE */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.cell}>Description</Text>
            <Text style={styles.cell}>Qty</Text>
            <Text style={styles.cell}>Unit Price</Text>
            <Text style={[styles.cell, styles.lastCell]}>Total</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.cell}>Car Rental Service</Text>
            <Text style={styles.cell}>1</Text>
            <Text style={styles.cell}>
              {currency} {amount.toFixed(2)}
            </Text>
            <Text style={[styles.cell, styles.lastCell]}>
              {currency} {amount.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* TOTAL */}
        <View style={styles.totalSection}>
          <Text>
            Subtotal: {currency} {amount.toFixed(2)}
          </Text>
          <Text>Tax: {currency} 0.00</Text>
          <Text style={{ fontWeight: "bold", marginTop: 5 }}>
            Total Paid: {currency} {amount.toFixed(2)}
          </Text>
        </View>

        {/* STRIPE INFO */}
        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <Text>Payment Method: Stripe</Text>
          <Text>Payment Intent ID: {stripePaymentIntentId}</Text>
        </View>

        {/* PAID BADGE */}
        {status === "SUCCESS" && <Text style={styles.paidBadge}>✔ PAID</Text>}

        {/* FOOTER */}
        <Text style={styles.footer}>
          Thank you for choosing 123 Car Rental. This is a system generated
          invoice and does not require a signature.
        </Text>
      </Page>
    </Document>
  );
}
