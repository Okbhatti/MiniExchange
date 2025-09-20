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
  progressContainer: {
    backgroundColor: theme.color.backgroundSecondary ?? '#fff',
    marginTop: 20,
    borderRadius: 16,
    width: '90%',
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.color.grayDark,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },

  //=================
  progressWrapper: {
    alignItems: 'center',
    marginVertical: 25,
  },
  labelOutside: {
    fontSize: 22,
    color: theme.color.white,
    marginBottom: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  circleContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  priceInside: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.color.white,
  },
  changePercent: {
    fontSize: 18,
    marginTop: 6,
    fontWeight: '600',
  },
});
