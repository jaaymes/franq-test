import { mount } from '@vue/test-utils';
import type { FormContext } from 'vee-validate';
import { useFormContext } from 'vee-validate';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { computed, ref } from 'vue';
import Input from './Input.vue';

// Mock do useFormContext
vi.mock('vee-validate', async () => {
  const actual = await vi.importActual('vee-validate');
  return {
    ...actual,
    useFormContext: vi.fn(),
  };
});

describe('Input', () => {
  const defaultProps = {
    name: 'test-input',
    label: 'Teste Input',
    placeholder: 'Digite algo...',
  };

  const mockFormContext = {
    isFieldDirty: () => false,
    errors: computed(() => ({})),
    values: ref({}),
    handleReset: vi.fn(),
    submitForm: vi.fn(),
    name: 'form',
    meta: computed(() => ({})),
    isSubmitting: ref(false),
    isValidating: ref(false),
    validate: vi.fn(),
    setFieldValue: vi.fn(),
    setFieldError: vi.fn(),
    setFieldTouched: vi.fn(),
    resetForm: vi.fn(),
    handleSubmit: vi.fn(),
    validateField: vi.fn(),
    setErrors: vi.fn(),
    setValues: vi.fn(),
    setTouched: vi.fn(),
    setFieldMeta: vi.fn(),
    setFieldValidation: vi.fn(),
    setFieldValidationSchema: vi.fn(),
    setFieldValidationRules: vi.fn(),
    setFieldValidationMessages: vi.fn(),
    setFieldValidationState: vi.fn(),
    setFieldValidationStatus: vi.fn(),
    setFieldValidationError: vi.fn(),
    setFieldValidationSuccess: vi.fn(),
    setFieldValidationWarning: vi.fn(),
    setFieldValidationInfo: vi.fn(),
    controlledValues: ref({}),
    submitCount: ref(0),
    errorBag: ref({}),
    createPathState: vi.fn(),
    getPathState: vi.fn(),
    setPathState: vi.fn(),
    getFieldValue: vi.fn(),
    getFieldError: vi.fn(),
    getFieldMeta: vi.fn(),
    getFieldValidation: vi.fn(),
    getFieldValidationSchema: vi.fn(),
    getFieldValidationRules: vi.fn(),
    getFieldValidationMessages: vi.fn(),
    getFieldValidationState: vi.fn(),
    getFieldValidationStatus: vi.fn(),
    getFieldValidationError: vi.fn(),
    getFieldValidationSuccess: vi.fn(),
    getFieldValidationWarning: vi.fn(),
    getFieldValidationInfo: vi.fn(),
  } as unknown as FormContext;

  beforeEach(() => {
    // Reset do mock antes de cada teste
    vi.mocked(useFormContext).mockReset();
  });

  it('deve renderizar corretamente com props padrão', () => {
    // Simula o contexto do formulário sem erros
    vi.mocked(useFormContext).mockReturnValue(mockFormContext);

    const wrapper = mount(Input, {
      props: defaultProps,
    });

    expect(wrapper.find('label').text()).toBe('Teste Input');
    expect(wrapper.find('input').attributes('placeholder')).toBe('Digite algo...');
    expect(wrapper.find('input').attributes('type')).toBe('text');
  });

  it('deve renderizar com tipo password e mostrar/ocultar senha', async () => {
    // Simula o contexto do formulário sem erros
    vi.mocked(useFormContext).mockReturnValue(mockFormContext);

    const wrapper = mount(Input, {
      props: {
        ...defaultProps,
        type: 'password',
      },
    });

    // Verifica se o input está com type password inicialmente
    expect(wrapper.find('input').attributes('type')).toBe('password');

    // Clica no botão de mostrar senha
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('input').attributes('type')).toBe('text');

    // Clica novamente para ocultar senha
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('input').attributes('type')).toBe('password');
  });

  it('deve mostrar asterisco quando isRequired é true', () => {
    // Simula o contexto do formulário sem erros
    vi.mocked(useFormContext).mockReturnValue(mockFormContext);

    const wrapper = mount(Input, {
      props: {
        ...defaultProps,
        isRequired: true,
      },
    });

    expect(wrapper.find('span').text()).toBe('*');
  });

  it('deve aplicar classe de erro quando há erro de validação', () => {
    // Simula o contexto do formulário com erro
    vi.mocked(useFormContext).mockReturnValue({
      ...mockFormContext,
      isFieldDirty: () => true,
      errors: computed(() => ({
        'test-input': 'Campo obrigatório',
      })),
    } as unknown as FormContext);

    const wrapper = mount(Input, {
      props: defaultProps,
    });

    expect(wrapper.find('input').attributes('data-error')).toBe('true');
  });
});
