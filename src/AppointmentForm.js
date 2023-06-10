export const AppointmentForm = ({
  original,
  selectableServices,
}) => (
  <form>
    <select
      name="service"
      value={original.service}
      readonly
    >
      <option />
      {selectableServices.map((s) => (
        <option key={s}>{s}</option>
      ))}
    </select>
  </form>
);

AppointmentForm.defaultProps = {
  selectableServices: [
    "Cut",
    "Brow-dry",
    "Cut & color",
    "Beard trim",
    "Cut & beard trim",
    "Extensions",
  ],
};
