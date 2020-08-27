const db = require('../data/config');

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes').where({ id }).first();
}

function findSteps(id) {
  return db('steps as st')
    .innerJoin('schemes as s', 'st.scheme_id', 's.id')
    .where('st.scheme_id', id)
    .select('st.id', 's.scheme_name', 'st.step_number', 'st.instructions')
    .orderBy('st.step_number');
}

function add(scheme) {
  return db('schemes')
    .insert(scheme)
    .then(id => findById(id[0]));
}

function update(changes, id) {
  return db('schemes').where({ id }).update(changes);
}

function remove(id) {
  return db('schemes').where('id', id).del();
}

module.exports = { find, findById, findSteps, add, update, remove };
