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
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    textAlign: "right"
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },

  label: {
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    fontWeight: "bold",
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

export const ContractDocument = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            style={styles.logo}
            src="http://localhost:3000/assets/logo-nav.png"
          />

          <View style={styles.companyInfo}>
            <Text style={styles.title}>Huurovereenkomst</Text>
            <Text style={styles.contractNo}>Contract #: 4481</Text>
            <Text>Datum: 13-01-2026</Text>
          </View>
        </View>

        {/* CUSTOMER + DRIVER */}
        <View style={styles.section}>
          <View style={styles.twoColumn}>

            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Huurder</Text>

              <Text><Text style={styles.label}>Naam:</Text> John Doe</Text>
              <Text><Text style={styles.label}>Adres:</Text> Kaya Industria 12</Text>
              <Text><Text style={styles.label}>Woonplaats:</Text> Bonaire</Text>
              <Text><Text style={styles.label}>Telefoon:</Text> +599 123456</Text>
              <Text><Text style={styles.label}>Geboortedatum:</Text> 01-01-1990</Text>
              <Text><Text style={styles.label}>Rijbewijsnummer:</Text> B-18066</Text>
            </View>

            <View style={styles.columnTwo}>
              <Text style={styles.sectionTitle}>Bestuurder</Text>

              <Text><Text style={styles.label}>Naam:</Text> John Doe</Text>
              <Text><Text style={styles.label}>Adres:</Text> Kaya Industria 12</Text>
              <Text><Text style={styles.label}>Woonplaats:</Text> Bonaire</Text>
              <Text><Text style={styles.label}>Geldig tot:</Text> 01-01-2030</Text>
            </View>

          </View>
        </View>

        {/* CAR DETAILS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Auto Informatie</Text>

          <View style={styles.row}>
            <Text><Text style={styles.label}>Categorie:</Text> Midsize SUV</Text>
            <Text><Text style={styles.label}>Kenteken:</Text> KLM</Text>
          </View>

          <View style={styles.row}>
            <Text>
              <Text style={styles.label}>Merk/Model:</Text> Toyota Raize 1.2 A/T
            </Text>
            <Text><Text style={styles.label}>Kleur:</Text> White</Text>
          </View>

          <View style={styles.row}>
            <Text><Text style={styles.label}>Brandstof:</Text> Benzine</Text>
            <Text><Text style={styles.label}>Begin KM:</Text> 12660</Text>
          </View>
        </View>

        {/* RENTAL DETAILS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overeenkomst Informatie</Text>

          <View style={styles.row}>
            <Text>
              <Text style={styles.label}>Ophaaldatum:</Text> 13-01-2026 20:00
            </Text>

            <Text>
              <Text style={styles.label}>Terugbrengdatum:</Text> 01-02-2026 18:00
            </Text>
          </View>

          <View style={styles.row}>
            <Text><Text style={styles.label}>Looptijd:</Text> 19 dagen</Text>
            <Text><Text style={styles.label}>Filiaal:</Text> 123 Car Rental Bonaire</Text>
          </View>
        </View>

        {/* PRICE TABLE */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tarief Informatie</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.th}>Omschrijving</Text>
              <Text style={styles.price}>Bedrag</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.td}>Huur (19 dagen)</Text>
              <Text style={styles.price}>$1,254.79</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.td}>100% Dekkingspakket</Text>
              <Text style={styles.price}>$268.85</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.td}>Korting (10%)</Text>
              <Text style={styles.price}>-$107.56</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.td}>Netto excl. ABB</Text>
              <Text style={styles.price}>$1,147.23</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={styles.td}>ABB 6%</Text>
              <Text style={styles.price}>$84.96</Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={{ flex: 2 }}>Totaal incl. ABB</Text>
              <Text style={styles.price}>$1,501.04</Text>
            </View>
          </View>
        </View>

        {/* TERMS */}
        <View style={styles.terms}>
          <Text>
            Bedragen zijn in US Dollar, excl. ABB tenzij anders vermeld.
          </Text>

          <Text>
            Indien het voertuig niet afgetankt wordt ingeleverd wordt $50
            plus brandstofkosten in rekening gebracht.
          </Text>

          <Text>
            Huurvoertuigen kunnen voorzien zijn van track & trace apparatuur.
          </Text>

          <Text>
            Persoonsgegevens worden verwerkt conform AVG regelgeving.
          </Text>
        </View>

        {/* SIGNATURE */}
        <View style={styles.signatures}>
          <View style={styles.signatureBox}>
            <Image
              src="https://dummyimage.com/200x80/000/fff&text=Signature"
              style={{ width: 100 }}
            />
            <Text style={styles.signatureLine}>Handtekening verhuurder</Text>
          </View>

          <View style={styles.signatureBox}>
            <Text style={{ height: 40 }}></Text>
            <Text style={styles.signatureLine}>
              Handtekening huurder / bestuurder
            </Text>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text>123 Car Rental Bonaire</Text>
          <Text>Kaya Industria Pariba 35, Kralendijk Bonaire</Text>
          <Text>info@123carrentalbonaire.com</Text>
        </View>

      </Page>
    </Document>
  );
};