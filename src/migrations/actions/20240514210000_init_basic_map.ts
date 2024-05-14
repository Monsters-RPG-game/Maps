import Map from '../../modules/maps/model';

export default {
  async up(): Promise<void> {
    const newMap = new Map({
      name: 'main',
      height: 5,
      width: 5,
      fields: [1, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 2, 1],
    });
    await newMap.save();
  },

  async down(): Promise<void> {
    await new Promise((resolve) => {
      resolve('');
    });
  },
};
