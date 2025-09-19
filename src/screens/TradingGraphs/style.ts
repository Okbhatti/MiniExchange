import { StyleSheet } from 'react-native';
import { theme } from '../../utils/helper';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.color.background },
  title: {
    fontSize: 22,
    color: theme.color.white,
    fontWeight: 'bold',
    marginTop: 20,
  },
  price: { fontSize: 24, fontWeight: 'bold' },
  percent: { fontSize: 18, marginTop: 5 },
  statsBox: { marginTop: 30, alignItems: 'center' },
  stat: { fontSize: 16, color: theme.color.white, marginVertical: 5 },
  btnRow: {
    flexDirection: 'row',
    marginTop: 40,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  btn: {
    flex: 1,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnText: { color: theme.color.white, fontWeight: '600', fontSize: 16 },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.color.grayDark,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start', // aligns left inside ScrollView
    paddingHorizontal: 20,
  },
});
