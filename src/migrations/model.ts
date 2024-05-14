import mongoose from 'mongoose';
import type { IMigration } from './types';
import type { Connection } from 'mongoose';

const migrationSchema = new mongoose.Schema<IMigration>({
  dbName: {
    type: String,
    required: [true, 'Db name not provided'],
  },

  changes: {
    type: [String],
    required: [true, 'Changes not provided'],
  },
});

const getModel = (db: Connection): mongoose.Model<IMigration> => {
  return db.model('Migration', migrationSchema);
};

export default getModel;
