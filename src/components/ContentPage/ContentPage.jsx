import React, { PureComponent, Fragment } from 'react';
import idx from 'idx';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, FieldArray, reduxForm, reset } from 'redux-form';
import Button from '@material-ui/core/Button';
import { saveSiteContent, getSiteContent } from '../../redux/actions/content';
import Toast from '../Toast';
import validate from './validate';
import StyledTextField from '../StyledTextField';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { PageHead, StyledPaper, Title, FormRow, Error, Part, PartsWrap, ProgramBlock, ProgramTitle, Wrap, Col } from './parts';

const renderPoints = ({ fields, meta: { error } }) => (
  <div>
    {fields.map((point, index) => (
      <FormRow className="hasicon" key={index}>
        <Field
          name={point}
          label={`Пункт ${index + 1}`}
          type="text"
          fieldProps={{
            multiline: true,
            inputProps: { maxLength: 200 },
          }}
          component={StyledTextField}
        />
        <IconButton aria-label="Delete" onClick={() => fields.remove(index)}>
          <Icon>delete</Icon>
        </IconButton>
      </FormRow>
    ))}
    {error && <div className="error">{error}</div>}
    <Button size="small" variant="contained" onClick={() => fields.push()} color="primary">
      Добавить пункт в описание программы
    </Button>
  </div>
);

class ContentPage extends PureComponent {
  state = {
    userToDelete: '',
    openToast: false
  };

  componentDidMount() {
    if (this.props.content && this.props.content._id) return;
    this.props.getSiteContent();
  }

  handleCloseToast = () => {
    this.setState({
      openToast: false,
      toastType: '',
      toastMessage: ''
    });
  };

  submitForm = async (values) => {
    try {
      await this.props.saveSiteContent(values);
      this.setState({
        toastType: 'success',
        toastMessage: 'Контент успешно обновлен',
        openToast: true
      });
      this.props.dispatch(reset('addUserForm'));
    } catch(error) {
      console.log('SAVE CONTENT ERROR: ', error.response);
      this.setState({
        toastType: 'alert',
        toastMessage: 'Ошибка системы',
        openToast: true
      });
    }
  };

  render() {
    const { openToast, toastMessage, toastType } = this.state;
    const { handleSubmit, dirty, submitting, valid, loadingStatus } = this.props;
    return (
      <Fragment>
        <Toast
          type={toastType}
          title={toastMessage}
          open={openToast}
          handleClose={this.handleCloseToast}
          duration={2000}
        />
        <PageHead>
          Контент
        </PageHead>
        {
          loadingStatus === 'FAIL' ? (<Error>Ошибка при загрузке контента</Error>) : (
            <form onSubmit={handleSubmit(this.submitForm)}>

              <Wrap>
                <Col>

                  <StyledPaper>
                    <Title>
                      Главный блок
                      <IconButton className="save" color="primary" aria-label="Save" type="submit" disabled={!dirty || submitting || !valid}>
                        <Icon>save</Icon>
                      </IconButton>
                    </Title>
                    <FormRow>
                      <Field
                        name="main.info"
                        label="Информация"
                        type="text"
                        fieldProps={{
                          multiline: true,
                          inputProps: { maxLength: 1000 },
                        }}
                        component={StyledTextField}
                      />
                      <Field
                        name="main.sub"
                        label="Дополнительное поле"
                        type="text"
                        component={StyledTextField}
                      />
                    </FormRow>
                    <PartsWrap>
                      <Part>
                        <FormRow>
                          <Field
                            name="main.sliderLeft"
                            label="Слайдер слева"
                            type="text"
                            component={StyledTextField}
                          />
                        </FormRow>
                      </Part>
                      <Part>
                        <FormRow>
                          <Field
                            name="main.sliderRight"
                            label="Слайдер справа"
                            type="text"
                            component={StyledTextField}
                          />
                        </FormRow>
                      </Part>
                    </PartsWrap>
                  </StyledPaper>

                  <StyledPaper>
                    <Title>
                      О проекте
                      <IconButton className="save" color="primary" aria-label="Save" type="submit" disabled={!dirty || submitting || !valid}>
                        <Icon>save</Icon>
                      </IconButton>
                    </Title>
                    <FormRow>
                      <Field
                        name="about.info"
                        label="Информация"
                        type="text"
                        fieldProps={{
                          multiline: true,
                          inputProps: { maxLength: 1000 },
                        }}
                        component={StyledTextField}
                      />
                    </FormRow>
                  </StyledPaper>

                    <StyledPaper>
                      <Title>
                        Что тебя ждёт в проекте
                        <IconButton className="save" color="primary" aria-label="Save" type="submit" disabled={!dirty || submitting || !valid}>
                          <Icon>save</Icon>
                        </IconButton>
                      </Title>
                      <PartsWrap>
                        <Part>
                          <FormRow>
                            <Field
                              name="benefits.ben1.name"
                              label="Заголовок 1"
                              type="text"
                              component={StyledTextField}
                            />
                          </FormRow>
                          <FormRow>
                            <Field
                              name="benefits.ben1.body"
                              label="Описание 1"
                              type="text"
                              fieldProps={{
                                multiline: true,
                                inputProps: { maxLength: 200 },
                              }}
                              component={StyledTextField}
                            />
                          </FormRow>
                        </Part>
                        <Part>
                          <FormRow>
                            <Field
                              name="benefits.ben2.name"
                              label="Заголовок 2"
                              type="text"
                              component={StyledTextField}
                            />
                          </FormRow>
                          <FormRow>
                            <Field
                              name="benefits.ben2.body"
                              label="Описание 2"
                              type="text"
                              fieldProps={{
                                multiline: true,
                                inputProps: { maxLength: 200 },
                              }}
                              component={StyledTextField}
                            />
                          </FormRow>
                        </Part>
                        <Part>
                          <FormRow>
                            <Field
                              name="benefits.ben3.name"
                              label="Заголовок 3"
                              type="text"
                              component={StyledTextField}
                            />
                          </FormRow>
                          <FormRow>
                          <Field
                            name="benefits.ben3.body"
                            label="Описание 3"
                            type="text"
                            fieldProps={{
                              multiline: true,
                              inputProps: { maxLength: 200 },
                            }}
                            component={StyledTextField}
                          />
                        </FormRow>
                      </Part>
                      <Part>
                        <FormRow>
                          <Field
                            name="benefits.ben4.name"
                            label="Заголовок 4"
                            type="text"
                            component={StyledTextField}
                          />
                        </FormRow>
                        <FormRow>
                          <Field
                            name="benefits.ben4.body"
                            label="Описание 4"
                            type="text"
                            fieldProps={{
                              multiline: true,
                              inputProps: { maxLength: 200 },
                            }}
                            component={StyledTextField}
                          />
                        </FormRow>
                      </Part>
                      <Part>
                        <FormRow>
                          <Field
                            name="benefits.ben5.name"
                            label="Заголовок 5"
                            type="text"
                            component={StyledTextField}
                          />
                        </FormRow>
                        <FormRow>
                          <Field
                            name="benefits.ben5.body"
                            label="Описание 5"
                            type="text"
                            fieldProps={{
                              multiline: true,
                              inputProps: { maxLength: 200 },
                            }}
                            component={StyledTextField}
                          />
                        </FormRow>
                      </Part>
                      <Part>
                        <FormRow>
                          <Field
                            name="benefits.ben6.name"
                            label="Заголовок 6"
                            type="text"
                            component={StyledTextField}
                          />
                        </FormRow>
                        <FormRow>
                          <Field
                            name="benefits.ben6.body"
                            label="Описание 6"
                            type="text"
                            fieldProps={{
                              multiline: true,
                              inputProps: { maxLength: 200 },
                            }}
                            component={StyledTextField}
                          />
                        </FormRow>
                      </Part>
                    </PartsWrap>
                  </StyledPaper>

                  <StyledPaper>
                    <Title>
                      Призы
                      <IconButton className="save" color="primary" aria-label="Save" type="submit" disabled={!dirty || submitting || !valid}>
                        <Icon>save</Icon>
                      </IconButton>
                    </Title>
                    <FormRow>
                      <Field
                        name="prizes.title"
                        label="Заголовок"
                        type="text"
                        component={StyledTextField}
                      />
                    </FormRow>
                    <FormRow>
                      <Field
                        name="prizes.subtitle"
                        label="Подзаголовок"
                        type="text"
                        component={StyledTextField}
                      />
                    </FormRow>
                    {/*<FormRow>*/}
                      {/*<Field*/}
                        {/*name="prizes.prize1"*/}
                        {/*label="1 место"*/}
                        {/*type="text"*/}
                        {/*component={StyledTextField}*/}
                      {/*/>*/}
                    {/*</FormRow>*/}
                    <FormRow>
                      <Field
                        name="prizes.prize2"
                        label="1 место"
                        type="text"
                        component={StyledTextField}
                      />
                    </FormRow>
                    <FormRow>
                      <Field
                        name="prizes.prize3"
                        label="2 место"
                        type="text"
                        component={StyledTextField}
                      />
                    </FormRow>
                    <FormRow>
                      <Field
                        name="prizes.prize4"
                        label="3 место"
                        type="text"
                        component={StyledTextField}
                      />
                    </FormRow>
                    <FormRow>
                      <Field
                        name="prizes.prize5"
                        label="Самая креативная"
                        type="text"
                        component={StyledTextField}
                      />
                    </FormRow>
                  </StyledPaper>

                  <StyledPaper>
                    <Title>
                      Организаторы
                      <IconButton className="save" color="primary" aria-label="Save" type="submit" disabled={!dirty || submitting || !valid}>
                        <Icon>save</Icon>
                      </IconButton>
                    </Title>
                    <FormRow>
                      <Field
                        name="teachers.teacher1.name"
                        label="Имя"
                        type="text"
                        component={StyledTextField}
                      />
                    </FormRow>
                    <FormRow>
                      <Field
                        name="teachers.teacher1.paragraph1"
                        label="Параграф 1"
                        type="text"
                        fieldProps={{
                          multiline: true,
                          inputProps: { maxLength: 200 },
                        }}
                        component={StyledTextField}
                      />
                    </FormRow>
                    <FormRow>
                      <Field
                        name="teachers.teacher1.paragraph2"
                        label="Параграф 2"
                        type="text"
                        fieldProps={{
                          multiline: true,
                          inputProps: { maxLength: 200 },
                        }}
                        component={StyledTextField}
                      />
                    </FormRow>
                  </StyledPaper>

                </Col>
                <Col>

                  <StyledPaper>
                    <Title>
                      Программы участия
                      <IconButton className="save" color="primary" aria-label="Save" type="submit" disabled={!dirty || submitting || !valid}>
                        <Icon>save</Icon>
                      </IconButton>
                    </Title>
                    <FormRow>
                      <Field
                        name="programs.start"
                        label="Заголовок"
                        type="text"
                        component={StyledTextField}
                      />
                      <ProgramBlock>
                        <ProgramTitle><span className="num"><span>1</span></span>Программа</ProgramTitle>
                        <PartsWrap>
                          <Part>
                            <FormRow>
                              <Field
                                name="programs.program1.name"
                                label="Название"
                                type="text"
                                component={StyledTextField}
                              />
                            </FormRow>
                          </Part>
                          <Part>
                            <FormRow>
                              <Field
                                name="programs.program1.price"
                                label="Стоимость участия"
                                type="text"
                                component={StyledTextField}
                              />
                            </FormRow>
                          </Part>
                        </PartsWrap>
                        <FieldArray name="programs.program1.points" component={renderPoints} />
                      </ProgramBlock>
                      <ProgramBlock>
                        <ProgramTitle><span className="num"><span>2</span></span>Программа</ProgramTitle>
                        <PartsWrap>
                          <Part>
                            <FormRow>
                              <Field
                                name="programs.program2.name"
                                label="Название"
                                type="text"
                                component={StyledTextField}
                              />
                            </FormRow>
                          </Part>
                          <Part>
                            <FormRow>
                              <Field
                                name="programs.program2.price"
                                label="Стоимость участия"
                                type="text"
                                component={StyledTextField}
                              />
                            </FormRow>
                          </Part>
                        </PartsWrap>
                        <FieldArray name="programs.program2.points" component={renderPoints} />
                      </ProgramBlock>
                      <ProgramBlock>
                        <ProgramTitle><span className="num"><span>3</span></span>Программа</ProgramTitle>
                        <PartsWrap>
                          <Part>
                            <FormRow>
                              <Field
                                name="programs.program3.name"
                                label="Название"
                                type="text"
                                component={StyledTextField}
                              />
                            </FormRow>
                          </Part>
                          <Part>
                            <FormRow>
                              <Field
                                name="programs.program3.price"
                                label="Стоимость участия"
                                type="text"
                                component={StyledTextField}
                              />
                            </FormRow>
                          </Part>
                        </PartsWrap>
                        <FieldArray name="programs.program3.points" component={renderPoints} />
                      </ProgramBlock>
                    </FormRow>
                  </StyledPaper>

                  <StyledPaper>
                    <Title>
                      Контактные данные
                      <IconButton className="save" color="primary" aria-label="Save" type="submit" disabled={!dirty || submitting || !valid}>
                        <Icon>save</Icon>
                      </IconButton>
                    </Title>
                    <FormRow>
                      <Field
                        name="contacts.inn"
                        label="ИНН"
                        type="text"
                        component={StyledTextField}
                      />
                    </FormRow>
                    <FormRow>
                      <Field
                        name="contacts.ogrn"
                        label="ОГРН"
                        type="text"
                        component={StyledTextField}
                      />
                    </FormRow>
                    <FormRow>
                      <Field
                        name="contacts.address"
                        label="Адрес"
                        type="text"
                        component={StyledTextField}
                      />
                    </FormRow>
                    <FormRow>
                      <Field
                        name="contacts.mobile"
                        label="Мобильный телефон"
                        type="text"
                        component={StyledTextField}
                      />
                    </FormRow>
                    <FormRow>
                      <Field
                        name="contacts.phone"
                        label="Телефон/факс"
                        type="text"
                        component={StyledTextField}
                      />
                    </FormRow>
                    <FormRow>
                      <Field
                        name="contacts.email"
                        label="Почта"
                        type="text"
                        component={StyledTextField}
                      />
                    </FormRow>
                  </StyledPaper>

                </Col>
              </Wrap>
            </form>
          )
        }
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  content: state.content ? state.content.content : {},
  loadingStatus: state.content ? state.content.loadingStatus : '',
  initialValues: {
    main: {
      info: idx(state, _ => _.content.content.main.info),
      sub: idx(state, _ => _.content.content.main.sub),
      sliderLeft: idx(state, _ => _.content.content.main.sliderLeft),
      sliderRight: idx(state, _ => _.content.content.main.sliderRight),
    },
    about: {
      info: idx(state, _ => _.content.content.about.info),
    },
    programs: {
      start: idx(state, _ => _.content.content.programs.start),
      program1: {
        name: idx(state, _ => _.content.content.programs.program1.name),
        price: idx(state, _ => _.content.content.programs.program1.price),
        points: idx(state, _ => _.content.content.programs.program1.points),
      },
      program2: {
        name: idx(state, _ => _.content.content.programs.program2.name),
        price: idx(state, _ => _.content.content.programs.program2.price),
        points: idx(state, _ => _.content.content.programs.program2.points),
      },
      program3: {
        name: idx(state, _ => _.content.content.programs.program3.name),
        price: idx(state, _ => _.content.content.programs.program3.price),
        points: idx(state, _ => _.content.content.programs.program3.points),
      }
    },
    benefits: {
      ben1: {
        name: idx(state, _ => _.content.content.benefits.ben1.name),
        body: idx(state, _ => _.content.content.benefits.ben1.body),
      },
      ben2: {
        name: idx(state, _ => _.content.content.benefits.ben2.name),
        body: idx(state, _ => _.content.content.benefits.ben2.body),
      },
      ben3: {
        name: idx(state, _ => _.content.content.benefits.ben3.name),
        body: idx(state, _ => _.content.content.benefits.ben3.body),
      },
      ben4: {
        name: idx(state, _ => _.content.content.benefits.ben4.name),
        body: idx(state, _ => _.content.content.benefits.ben4.body),
      },
      ben5: {
        name: idx(state, _ => _.content.content.benefits.ben5.name),
        body: idx(state, _ => _.content.content.benefits.ben5.body),
      },
      ben6: {
        name: idx(state, _ => _.content.content.benefits.ben6.name),
        body: idx(state, _ => _.content.content.benefits.ben6.body),
      }
    },
    prizes: {
      title: idx(state, _ => _.content.content.prizes.title),
      subtitle: idx(state, _ => _.content.content.prizes.subtitle),
      prize1: idx(state, _ => _.content.content.prizes.prize1),
      prize2: idx(state, _ => _.content.content.prizes.prize2),
      prize3: idx(state, _ => _.content.content.prizes.prize3),
      prize4: idx(state, _ => _.content.content.prizes.prize4),
      prize5: idx(state, _ => _.content.content.prizes.prize5),
    },
    teachers: {
      teacher1: {
        name: idx(state, _ => _.content.content.teachers.teacher1.name),
        paragraph1: idx(state, _ => _.content.content.teachers.teacher1.paragraph1),
        paragraph2: idx(state, _ => _.content.content.teachers.teacher1.paragraph2),
      }
    },
    contacts: {
      inn: idx(state, _ => _.content.content.contacts.inn),
      ogrn: idx(state, _ => _.content.content.contacts.ogrn),
      address: idx(state, _ => _.content.content.contacts.address),
      mobile: idx(state, _ => _.content.content.contacts.mobile),
      phone: idx(state, _ => _.content.content.contacts.phone),
      email: idx(state, _ => _.content.content.contacts.email),
    }
  }
});

export default compose(
  connect(
    mapStateToProps,
    { saveSiteContent, getSiteContent }
  ),
  reduxForm({
    form: 'contentForm',
    validate,
    enableReinitialize: true,
  })
)(ContentPage);
