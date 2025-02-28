import { slugify } from './slugify';

describe('slugify', () => {
  // Test trường hợp chuỗi chỉ chứa các ký tự Latin không dấu và khoảng trắng, hàm sẽ trả về slug phù hợp
  test('Trả về slug phù hợp khi chuỗi chỉ chứa các ký tự Latin không dấu và khoảng trắng', () => {
    const text = 'This is a sample text';
    const expectedSlug = 'this-is-a-sample-text';
    expect(slugify(text)).toBe(expectedSlug);
  });

  // Test trường hợp chuỗi chứa các ký tự có dấu tiếng Việt, hàm sẽ loại bỏ các dấu và chuyển thành slug
  test('Loại bỏ các dấu tiếng Việt và chuyển đổi thành slug', () => {
    const text = 'Đây là một ví dụ về tiếng Việt';
    const expectedSlug = 'day-la-mot-vi-du-ve-tieng-viet';
    expect(slugify(text)).toBe(expectedSlug);
  });

  // Test trường hợp chuỗi chứa các ký tự đặc biệt, hàm sẽ loại bỏ chúng và chuyển thành slug
  test('Loại bỏ các ký tự đặc biệt và chuyển đổi thành slug', () => {
    const text = 'Special @!#$ Characters';
    const expectedSlug = 'special-characters';
    expect(slugify(text)).toBe(expectedSlug);
  });

  // Test trường hợp chuỗi trống, hàm sẽ trả về chuỗi rỗng
  test('Trả về chuỗi rỗng khi đầu vào là chuỗi trống', () => {
    const text = '';
    expect(slugify(text)).toBe('');
  });

  // Test trường hợp chuỗi chỉ chứa khoảng trắng, hàm sẽ trả về slug rỗng
  test('Trả về slug rỗng khi chuỗi chỉ chứa khoảng trắng', () => {
    const text = '      ';
    expect(slugify(text)).toBe('');
  });
});
