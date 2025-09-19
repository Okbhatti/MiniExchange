import { StyleSheet } from 'react-native';
import { theme } from '../../utils/helper';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.color.background, padding: 20 },
  greeting: { fontSize: 18, color: theme.color.white },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.color.blue,
    marginVertical: 10,
  },
  summaryBox: { marginVertical: 20 },
  income: { fontSize: 16, color: theme.color.green, marginBottom: 4 },
  outcome: { fontSize: 16, color: theme.color.blue },
  coinRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: theme.color.backgroundSecondary,
  },
  coinName: { fontSize: 16, fontWeight: '500', color: theme.color.white },
  coinPrice: { fontSize: 14, fontWeight: '600', color: theme.color.grayLight },
  coinChange: { fontSize: 12 },
});
