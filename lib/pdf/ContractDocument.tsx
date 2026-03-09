import {
  Document,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { Booking, Car, User } from "@/generated/prisma/client";
import fs from "fs";
import path from "path";

type BookingWithCarAndUser = Booking & { car: Car; user: User };

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontSize: 10,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    borderBottom: "1px solid #ddd",
    paddingBottom: 10,
  },
  logo: {
    width: 120,
  },
  companyInfo: {
    textAlign: "right",
  },
  title: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
  },
  contractNo: {
    fontSize: 11,
  },
  section: {
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
    borderBottom: "1px solid #eee",
    paddingBottom: 3,
  },
  twoColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  columnTwo: {
    width: "48%",
    textAlign: "right",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  label: {
    fontFamily: "Helvetica-Bold",
  },
  table: {
    marginTop: 6,
    borderTop: "1px solid #ccc",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 4,
    borderBottom: "1px solid #eee",
  },
  th: {
    flex: 2,
    fontFamily: "Helvetica-Bold",
  },
  td: {
    flex: 2,
  },
  price: {
    flex: 1,
    textAlign: "right",
  },
  totalRow: {
    flexDirection: "row",
    marginTop: 5,
    fontFamily: "Helvetica-Bold",
  },
  terms: {
    marginTop: 15,
    fontSize: 9,
    color: "#444",
  },
  signatures: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
  },
  signatureBox: {
    width: "40%",
    textAlign: "center",
  },
  signatureLine: {
    borderTop: "1px solid #000",
    marginTop: 25,
    paddingTop: 4,
  },
  footer: {
    marginTop: 25,
    fontSize: 9,
    textAlign: "center",
    borderTop: "1px solid #eee",
    paddingTop: 10,
  },
});

const logoPath = path.join(process.cwd(), "public", "assets", "logo-nav.png");
const logoBase64 = `data:image/png;base64,${fs.readFileSync(logoPath).toString("base64")}`;

function fmt(date: Date | string) {
  return new Date(date).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function fmtCurrency(amount: number) {
  return `$${amount.toFixed(2)}`;
}

export const ContractDocument = ({
  booking,
}: {
  booking: BookingWithCarAndUser;
}) => {
  const { user, car } = booking;

  const baseAmount = booking.pricePerDay * booking.totalDays;
  const coverageAmount = booking.coverage === "PREMIUM" ? 12 * booking.totalDays : 0;

  const extrasLines: { label: string; qty: number; price: number }[] = [];
  if (booking.babySeatSmall) extrasLines.push({ label: "Babystoeltje (< 18 maanden)", qty: booking.babySeatSmall, price: 5 });
  if (booking.babySeatLarge) extrasLines.push({ label: "Babystoeltje (> 18 maanden)", qty: booking.babySeatLarge, price: 5 });
  if (booking.coolbox) extrasLines.push({ label: "Koelbox", qty: booking.coolbox, price: 4 });
  if (booking.keySecureBox) extrasLines.push({ label: "Sleutelkluis", qty: booking.keySecureBox, price: 2.5 });

  const extrasAmount = extrasLines.reduce((sum, e) => sum + e.price * e.qty * booking.totalDays, 0);
  const subtotal = baseAmount + coverageAmount + extrasAmount;
  const tax = subtotal * 0.06;
  const total = subtotal + tax;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER */}
        <View style={styles.header}>
          <Image src={logoBase64} style={styles.logo} />
          <View style={styles.companyInfo}>
            <Text style={styles.title}>Huurovereenkomst</Text>
            <Text style={styles.contractNo}>Contract #: {booking.id}</Text>
            <Text>Datum: {fmt(booking.createdAt)}</Text>
          </View>
        </View>

        {/* HUURDER + BESTUURDER */}
        <View style={styles.section}>
          <View style={styles.twoColumn}>

            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Huurder</Text>
              <Text><Text style={styles.label}>Naam:</Text> {user.firstName} {user.lastName}</Text>
              <Text><Text style={styles.label}>Email:</Text> {user.email}</Text>
              <Text><Text style={styles.label}>Telefoon:</Text> {user.phoneCode} {user.phone}</Text>
              {booking.driversDOB && (
                <Text><Text style={styles.label}>Geboortedatum:</Text> {fmt(booking.driversDOB)}</Text>
              )}
              {booking.driversLicNo && (
                <Text><Text style={styles.label}>Rijbewijsnummer:</Text> {booking.driversLicNo}</Text>
              )}
            </View>

            <View style={styles.columnTwo}>
              <Text style={styles.sectionTitle}>Bestuurder</Text>
              <Text><Text style={styles.label}>Naam:</Text> {user.firstName} {user.lastName}</Text>
              <Text><Text style={styles.label}>Telefoon:</Text> {user.phoneCode} {user.phone}</Text>
              {booking.driversDOB && (
                <Text><Text style={styles.label}>Geboortedatum:</Text> {fmt(booking.driversDOB)}</Text>
              )}
              {booking.driversLicNo && (
                <Text><Text style={styles.label}>Rijbewijs:</Text> {booking.driversLicNo}</Text>
              )}
            </View>

          </View>
        </View>

        {/* AUTO INFORMATIE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Auto Informatie</Text>

          <View style={styles.row}>
            <Text><Text style={styles.label}>Categorie:</Text> {car.carType}</Text>
            <Text><Text style={styles.label}>Kenteken:</Text> {car.plate ?? "—"}</Text>
          </View>

          <View style={styles.row}>
            <Text><Text style={styles.label}>Merk/Model:</Text> {car.brand} {car.model} {car.year}</Text>
            <Text><Text style={styles.label}>Transmissie:</Text> {car.transmission}</Text>
          </View>

          <View style={styles.row}>
            <Text><Text style={styles.label}>Brandstof:</Text> {car.fuelType}</Text>
            <Text><Text style={styles.label}>Zitplaatsen:</Text> {car.seats ?? "—"}</Text>
          </View>
        </View>

        {/* OVEREENKOMST INFORMATIE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overeenkomst Informatie</Text>

          <View style={styles.row}>
            <Text>
              <Text style={styles.label}>Ophaaldatum:</Text> {fmt(booking.startDate)} {booking.pickupTime}
            </Text>
            <Text>
              <Text style={styles.label}>Terugbrengdatum:</Text> {fmt(booking.endDate)} {booking.dropoffTime}
            </Text>
          </View>

          <View style={styles.row}>
            <Text><Text style={styles.label}>Looptijd:</Text> {booking.totalDays} dag{booking.totalDays !== 1 ? "en" : ""}</Text>
            <Text><Text style={styles.label}>Filiaal:</Text> YU Car Rental Bonaire</Text>
          </View>

          <View style={styles.row}>
            <Text><Text style={styles.label}>Ophaallocatie:</Text> {booking.pickupLocation.replace(/-/g, " ")}</Text>
            <Text><Text style={styles.label}>Terugbrenglocatie:</Text> {booking.dropoffLocation.replace(/-/g, " ")}</Text>
          </View>

          <View style={styles.row}>
            <Text><Text style={styles.label}>Dekking:</Text> {booking.coverage === "PREMIUM" ? "Premium (100% Dekking)" : "Standaard (CDW Verzekering)"}</Text>
          </View>
        </View>

        {/* TARIEF INFORMATIE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tarief Informatie</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.th}>Omschrijving</Text>
              <Text style={styles.price}>Bedrag</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.td}>Huur ({booking.totalDays} dagen × ${booking.pricePerDay}/dag)</Text>
              <Text style={styles.price}>{fmtCurrency(baseAmount)}</Text>
            </View>

            {booking.coverage === "PREMIUM" && (
              <View style={styles.tableRow}>
                <Text style={styles.td}>100% Dekkingspakket ($12/dag × {booking.totalDays} dagen)</Text>
                <Text style={styles.price}>{fmtCurrency(coverageAmount)}</Text>
              </View>
            )}

            {extrasLines.map((e) => (
              <View key={e.label} style={styles.tableRow}>
                <Text style={styles.td}>{e.label} (${e.price}/dag × {e.qty} × {booking.totalDays} dagen)</Text>
                <Text style={styles.price}>{fmtCurrency(e.price * e.qty * booking.totalDays)}</Text>
              </View>
            ))}

            <View style={styles.tableRow}>
              <Text style={styles.td}>Netto excl. ABB</Text>
              <Text style={styles.price}>{fmtCurrency(subtotal)}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.td}>ABB 6%</Text>
              <Text style={styles.price}>{fmtCurrency(tax)}</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={{ flex: 2 }}>Totaal incl. ABB</Text>
              <Text style={styles.price}>{fmtCurrency(total)}</Text>
            </View>
          </View>
        </View>

        {/* VOORWAARDEN */}
        <View style={styles.terms}>
          <Text>Bedragen zijn in US Dollar, excl. ABB tenzij anders vermeld.</Text>
          <Text>Indien het voertuig niet afgetankt wordt ingeleverd wordt $50 plus brandstofkosten in rekening gebracht.</Text>
          <Text>Huurvoertuigen kunnen voorzien zijn van track & trace apparatuur.</Text>
          <Text>Persoonsgegevens worden verwerkt conform AVG regelgeving.</Text>
        </View>

        {/* HANDTEKENINGEN */}
        <View style={styles.signatures}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLine}>Handtekening verhuurder</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLine}>Handtekening huurder / bestuurder</Text>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text>YU Car Rental Bonaire</Text>
          <Text>Kaya Industria Pariba 35, Kralendijk Bonaire</Text>
          <Text>info@yucarrental.com</Text>
        </View>

      </Page>
    </Document>
  );
};
