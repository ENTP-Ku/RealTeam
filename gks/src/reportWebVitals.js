const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // onPerfEntry가 함수인지 확인
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // web-vitals 패키지에서 성능 측정 함수들 가져오기
      getCLS(onPerfEntry); // Cumulative Layout Shift 측정
      getFID(onPerfEntry); // First Input Delay 측정
      getFCP(onPerfEntry); // First Contentful Paint 측정
      getLCP(onPerfEntry); // Largest Contentful Paint 측정
      getTTFB(onPerfEntry); // Time to First Byte 측정
    });
  }
};

export default reportWebVitals;
