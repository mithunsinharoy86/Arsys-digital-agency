migrate((app) => {
 let existing;
 try { existing = app.findCollectionByNameOrId('enquiries'); } catch (_) { existing = null; }
 if (existing) return;
 const collection = new Collection({ name: 'enquiries', type: 'base', listRule: null, viewRule: null, createRule: '@request.body.consent = true', updateRule: null, deleteRule: null, fields: [
 { name: 'name', type: 'text', required: true, max: 150 },
 { name: 'email', type: 'email', required: true },
 { name: 'company', type: 'text', max: 200 },
 { name: 'service', type: 'text', required: true, max: 200 },
 { name: 'market', type: 'text', required: true, max: 100 },
 { name: 'message', type: 'text', required: true, min: 10, max: 5000 },
 { name: 'consent', type: 'bool', required: true },
 { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
 { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true }
 ] }); app.save(collection);
}, (app) => { const c=app.findCollectionByNameOrId('enquiries'); app.delete(c); });
