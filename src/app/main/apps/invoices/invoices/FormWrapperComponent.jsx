import { useFormikContext } from 'formik';
import { useEffect } from 'react';

// function calculatedTaxAmount() {
//   const calculatedCgst = (values.formData.cgst / 100) * values.formData.grand_total;
//   const calculateSgst = (values.formData.sgst / 100) * values.formData.grand_total;
//   const calculateIgst = (values.formData.igst / 100) * values.formData.grand_total;
//
//   const calTaxTotal = calculatedCgst + calculateSgst + calculateIgst;
//   console.log('tax Total ==================>', calTaxTotal)
//   setFieldValue('formData.taxTotal', Number(calTaxTotal));
//   return Number(calTaxTotal);
// }

// const tempGrandTotal = function () {
//   let calculatedValue;
//
//   console.log("calculated tax amount function", calculatedTaxAmount())
//
//   if (values.formData.discountAmount) {
//     calculatedValue = values.formData.grand_total - values.formData.discountAmount;
//     return calculatedValue + calculatedTaxAmount();
//   }
//
//   if (values.formData.discount) {
//     calculatedValue =
//       values.formData.grand_total -
//       values.formData.grand_total * (values.formData.discount / 100);
//
//     return calculatedValue + calculatedTaxAmount();
//   }
//
//   calculatedValue = values.formData.grand_total + calculatedTaxAmount();
//   return calculatedValue;
// };

function FormWrapperComponent({
  children,
  filterGrandTotal,
  setFilterGrandTotal,
  setTaxAmountTotal,
}) {
  const { values, setFieldValue } = useFormikContext();

  function calculatedTaxAmount(calculatedValue) {
    const calculatedCgst =
      (values.formData.cgst / 100) * (calculatedValue === 0 ? values.formData.grand_total : calculatedValue);
    const calculateSgst =
      (values.formData.sgst / 100) * (calculatedValue === 0 ? values.formData.grand_total : calculatedValue);
    const calculateIgst =
      (values.formData.igst / 100) * (calculatedValue === 0 ? values.formData.grand_total : calculatedValue);

    if (calculatedCgst === 0 && calculateSgst === 0) {
      setTaxAmountTotal(0);
    }

    if (calculatedCgst !== 0 && calculateSgst !== 0) {
      const calTaxTotalSample = calculatedCgst + calculateSgst;
      setTaxAmountTotal(calTaxTotalSample);
      // setFieldValue('formData.taxTotal', Number(calTaxTotalSample));
      return Number(calTaxTotalSample);
    }

    if (calculateIgst === 0) {
      setTaxAmountTotal(0);
    }

    if (calculateIgst !== 0) {
      const calTaxTotalSample = calculateIgst;
      setTaxAmountTotal(calTaxTotalSample);
      return Number(calculateIgst);
    }

    const calTaxTotal = 0;
    return Number(calTaxTotal);
  }

  // eslint-disable-next-line func-names
  const tempGrandTotal = function () {
    let calculatedValue = 0;

    if (values.formData.discountAmount) {
      calculatedValue = values.formData.grand_total - values.formData.discountAmount;
      return calculatedValue + calculatedTaxAmount(calculatedValue);
    }

    if (values.formData.discount) {
      calculatedValue =
        values.formData.grand_total -
        values.formData.grand_total * (values.formData.discount / 100);

      return calculatedValue + calculatedTaxAmount(calculatedValue);
    }

    calculatedValue = values.formData.grand_total + calculatedTaxAmount(calculatedValue);
    return calculatedValue;
  };

  useEffect(() => {
    if (values.formData && values.formData.grand_total) {
      setFilterGrandTotal(tempGrandTotal());
    }
  }, [values.formData]);

  return children;
}

export default FormWrapperComponent;
